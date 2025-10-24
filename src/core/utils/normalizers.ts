// src/core/utils/normalizers.ts

import {
  EpisodeDTO,
  PodcastDTO,
  UiEpisode,
} from "@/features/catalog/domain/entities/Episode";
import { UiPodcast } from "@/features/catalog/domain/entities/Podcast";

export function toCatalogDTO(p: any) {
  if (p && typeof p.toJSON === "function") return p.toJSON();
  if (p && p.id && p.title && p.author && p.image) {
    return {
      id: String(p.id),
      title: String(p.title),
      author: String(p.author),
      image: String(p.image),
    };
  }
  return null;
}

/**
 * Normalize a lookup (results array) into podcast meta + episodes, handling
 * multiple shapes from iTunes:
 *  - meta: { wrapperType: 'collection' } OR { wrapperType: 'track', kind: 'podcast' }
 *  - episode: { wrapperType: 'track', kind: 'podcast-episode' } OR { wrapperType: 'podcastEpisode' }
 */
export function normalizeLookup(results: any[], requestedId: string) {
  let podcast: PodcastDTO | undefined;
  const episodes: EpisodeDTO[] = [];

  const isTarget = (cid: any) => String(cid ?? "") === requestedId;

  for (const item of results) {
    const wt = item?.wrapperType;
    const kind = item?.kind;

    if (wt === "collection" && isTarget(item.collectionId)) {
      podcast = {
        id: String(item.collectionId),
        title: String(item.collectionName ?? ""),
        author: String(item.artistName ?? ""),
        image: String(item.artworkUrl600 ?? item.artworkUrl100 ?? ""),
        summary: String(item.description ?? item.shortDescription ?? ""),
      };
      continue;
    }
    if (
      wt === "track" &&
      kind === "podcast" &&
      isTarget(item.collectionId ?? item.trackId)
    ) {
      podcast ??= {
        id: String(item.collectionId ?? item.trackId ?? ""),
        title: String(item.collectionName ?? item.trackName ?? ""),
        author: String(item.artistName ?? ""),
        image: String(item.artworkUrl600 ?? item.artworkUrl100 ?? ""),
        summary: String(item.description ?? item.shortDescription ?? ""),
      };
      continue;
    }

    const isEpisodeTrack =
      item?.wrapperType === "track" && item?.kind === "podcast-episode";
    const isEpisodeDirect = item?.wrapperType === "podcastEpisode";
    if (isEpisodeTrack || isEpisodeDirect) {
      const cid = String(item.collectionId ?? "");
      if (cid === requestedId) {
        episodes.push({
          id: String(item.trackId ?? item.episodeGuid ?? ""),
          podcastId: cid,
          title: String(item.trackName ?? "(untitled)"),
          publishDateISO: String(item.releaseDate ?? ""),
          durationMs:
            typeof item.trackTimeMillis === "number"
              ? item.trackTimeMillis
              : undefined,
          descriptionHTML:
            item.description ?? item.shortDescription ?? undefined,
          audioUrl: item.episodeUrl ?? item.previewUrl ?? undefined,
        });
      }
    }
  }

  const uniq = new Map<string, EpisodeDTO>();
  for (const e of episodes) uniq.set(e.id, e);
  return { podcast, episodes: Array.from(uniq.values()) };
}

export function toPodcastDTO(p: any) {
  if (p && typeof p.toJSON === "function") return p.toJSON();
  if (p && p.id && p.title && p.author && p.image) return p as UiPodcast;
  return null;
}
export function toEpisodeDTO(e: any) {
  if (e && typeof e.toJSON === "function") return e.toJSON();
  if (e && e.id && e.podcastId && e.title && e.publishDateISO)
    return e as UiEpisode;
  return null;
}

/**
 * Normalize a single Top 100 feed entry to {id,title,author,image,summary}.
 * The RSS JSON uses the "im:" namespace for some fields.
 */
export function normalizeTopEntry(entry: any) {
  const id = entry?.id?.attributes?.["im:id"] ?? entry?.id?.label ?? "";
  const title = entry?.["im:name"]?.label ?? entry?.title?.label ?? "";
  const author = entry?.["im:artist"]?.label ?? entry?.artist?.label ?? "";
  const images: any[] = entry?.["im:image"] ?? [];
  const image = images[images.length - 1]?.label ?? images[0]?.label ?? "";
  const summary = entry?.summary?.label ?? "";
  return { id, title, author, image, summary };
}
