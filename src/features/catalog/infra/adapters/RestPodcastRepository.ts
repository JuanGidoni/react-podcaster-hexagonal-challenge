// src/features/catalog/infra/adapters/RestPodcastRepository.ts

/**
 * @file RestPodcastRepository adapter
 * @description
 * iTunes Top 100 + Lookup adapter that implements the PodcastRepository port.
 * - Top 100 feed (US, genre=1310, limit=100): JSON RSS
 * - Lookup by collectionId with entity=podcastEpisode (includes podcast meta + episodes)
 * - 24h client-side caching via Cache + withTTL()
 *
 * Endpoints (from the challenge PDF):
 *  - Top 100: https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
 *  - Lookup:  https://itunes.apple.com/lookup?id={collectionId}&media=podcast&entity=podcastEpisode&limit=200
 */

import type { PodcastRepository } from "../../domain/ports/PodcastRepository";
import type { HttpClient } from "@/core/http/HttpClient";
import type { Cache } from "@/core/cache/types";
import { withTTL } from "@/core/cache/withTTL";
import { Podcast } from "../../domain/entities/Podcast";
import { Episode } from "../../domain/entities/Episode";
import { PodcastId } from "../../domain/valueObjects/PodcastId";
import { EpisodeId } from "../../domain/valueObjects/EpisodeId";

const DAY_MS = 24 * 60 * 60 * 1000;
const EPISODE_LIMIT = 20;

export interface RestPodcastRepositoryOptions {
  /** Base cache key prefix (default: 'podcaster:') */
  cachePrefix?: string;
  /** TTL for list/detail/episodes (default: 24h) */
  ttlMs?: number;
}

/**
 * Normalize a single Top 100 feed entry to {id,title,author,image,summary}.
 * The RSS JSON uses the "im:" namespace for some fields.
 */
function normalizeTopEntry(entry: any) {
  const id = entry?.id?.attributes?.["im:id"] ?? entry?.id?.label ?? "";
  const title = entry?.["im:name"]?.label ?? entry?.title?.label ?? "";
  const author = entry?.["im:artist"]?.label ?? entry?.artist?.label ?? "";
  const images: any[] = entry?.["im:image"] ?? [];
  const image = images[images.length - 1]?.label ?? images[0]?.label ?? "";
  const summary = entry?.summary?.label ?? "";
  return { id, title, author, image, summary };
}

/**
 * Normalize a lookup (results array) to:
 *  - `podcast`: the collection item (collectionId, collectionName, artistName, artworkUrl600, description)
 *  - `episodes`: list of episode entries (trackId, trackName, releaseDate, trackTimeMillis, description, episodeUrl)
 */
function normalizeLookup(results: any[]) {
  const episodes: {
    id: string;
    podcastId: string;
    title: string;
    publishDateISO: string;
    durationMs?: number;
    descriptionHTML?: string;
    audioUrl?: string;
  }[] = [];

  let podcast:
    | {
        id: string;
        title: string;
        author: string;
        image: string;
        summary?: string;
      }
    | undefined;

  for (const item of results) {
    if (item.wrapperType === "track" && item.kind === "podcast") {
      // Sometimes lookup returns podcast rows as 'track' too, but we prefer collection for meta.
      // Keep as backup if collection isn't present.
      podcast ??= {
        id: String(item.collectionId ?? item.trackId ?? ""),
        title: String(item.collectionName ?? item.trackName ?? ""),
        author: String(item.artistName ?? ""),
        image: String(item.artworkUrl600 ?? item.artworkUrl100 ?? ""),
        summary: String(item.description ?? item.shortDescription ?? ""),
      };
    }

    if (item.wrapperType === "collection" || item.collectionId) {
      // Collection row — authoritative source for podcast meta
      podcast = {
        id: String(item.collectionId ?? ""),
        title: String(item.collectionName ?? ""),
        author: String(item.artistName ?? ""),
        image: String(item.artworkUrl600 ?? item.artworkUrl100 ?? ""),
        summary: String(item.description ?? item.shortDescription ?? ""),
      };
    }

    // Episodes are entity=podcastEpisode with wrapperType 'track' and kind 'podcast-episode' in many cases
    if (
      item.wrapperType === "track" &&
      (item.kind === "podcast-episode" ||
        item.episodeGuid ||
        item.trackTimeMillis)
    ) {
      const podcastId = String(item.collectionId ?? item.trackId ?? "");
      episodes.push({
        id: String(item.trackId ?? item.episodeGuid ?? ""),
        podcastId,
        title: String(item.trackName ?? "(untitled)"),
        publishDateISO: String(item.releaseDate ?? ""),
        durationMs:
          typeof item.trackTimeMillis === "number"
            ? item.trackTimeMillis
            : undefined,
        descriptionHTML: item.description ?? item.shortDescription ?? undefined,
        audioUrl: item.episodeUrl ?? item.previewUrl ?? undefined,
      });
    }
  }

  return { podcast, episodes };
}

export class RestPodcastRepository implements PodcastRepository {
  private readonly http: HttpClient;
  private readonly cache: Cache;
  private readonly ttlMs: number;
  private readonly cachePrefix: string;

  constructor(
    http: HttpClient,
    cache: Cache,
    opts: RestPodcastRepositoryOptions = {}
  ) {
    this.http = http;
    this.cache = cache;
    this.ttlMs = opts.ttlMs ?? DAY_MS;
    this.cachePrefix = opts.cachePrefix ?? "podcaster:";
  }

  async getTop100(): Promise<Podcast[]> {
    const key = `${this.cachePrefix}top100`;
    const load = async () => {
      const { data } = await this.http.request<any>({
        url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
      });
      const entries: any[] = data?.feed?.entry ?? [];
      return entries
        .map(normalizeTopEntry)
        .filter((e) => e.id && e.title && e.author && e.image)
        .map(
          (e) =>
            new Podcast({
              id: new PodcastId(e.id),
              title: e.title,
              author: e.author,
              image: e.image,
              summary: e.summary,
            })
        );
    };
    return withTTL(this.cache, key, this.ttlMs, load)();
  }

  async getPodcastDetail(podcastId: PodcastId): Promise<Podcast | null> {
    const key = `${this.cachePrefix}podcast:${podcastId.toString()}:detail`;
    const load = async () => {
      const { data } = await this.http.request<any>({
        url: `https://itunes.apple.com/lookup?id=${encodeURIComponent(podcastId.toString())}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`,
      });
      const { podcast } = normalizeLookup(data?.results ?? []);
      if (!podcast?.id) return null;
      return new Podcast({
        id: new PodcastId(podcast.id),
        title: podcast.title,
        author: podcast.author,
        image: podcast.image,
        summary: podcast.summary,
      });
    };
    return withTTL(this.cache, key, this.ttlMs, load)();
  }

  async getPodcastEpisodes(podcastId: PodcastId): Promise<Episode[]> {
    const key = `${this.cachePrefix}podcast:${podcastId.toString()}:episodes`;
    const load = async () => {
      const { data } = await this.http.request<any>({
        url: `https://itunes.apple.com/lookup?id=${encodeURIComponent(podcastId.toString())}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`,
      });
      const { episodes } = normalizeLookup(data?.results ?? []);
      return episodes
        .filter((e) => e.podcastId && e.id && e.title && e.publishDateISO)
        .slice(0, EPISODE_LIMIT)
        .map(
          (e) =>
            new Episode({
              id: new EpisodeId(e.id),
              podcastId: new PodcastId(e.podcastId),
              title: e.title,
              publishDateISO: e.publishDateISO,
              durationMs: e.durationMs,
              descriptionHTML: e.descriptionHTML,
              audioUrl: e.audioUrl,
            })
        );
    };
    return withTTL(this.cache, key, this.ttlMs, load)();
  }
}
