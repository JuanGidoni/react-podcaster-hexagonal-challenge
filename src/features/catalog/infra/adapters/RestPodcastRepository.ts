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
import { normalizeLookup, normalizeTopEntry } from "@/core/utils/normalizers";

const DAY_MS = 24 * 60 * 60 * 1000;
const EPISODE_LIMIT = 20;

export interface RestPodcastRepositoryOptions {
  /** Base cache key prefix (default: 'podcaster:') */
  cachePrefix?: string;
  /** TTL for list/detail/episodes (default: 24h) */
  ttlMs?: number;
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
      const requestedId = podcastId.toString();
      const { data } = await this.http.request<any>({
        url: `https://itunes.apple.com/lookup?id=${encodeURIComponent(requestedId)}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`,
      });
      const { podcast } = normalizeLookup(data?.results ?? [], requestedId);
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
      const requestedId = podcastId.toString();
      const { data } = await this.http.request<any>({
        url: `https://itunes.apple.com/lookup?id=${encodeURIComponent(requestedId)}&media=podcast&entity=podcastEpisode&limit=${EPISODE_LIMIT}`,
      });
      const { episodes } = normalizeLookup(data?.results ?? [], requestedId);
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
