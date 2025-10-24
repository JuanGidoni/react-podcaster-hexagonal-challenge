// src/features/catalog/infra/mappers/podcastMapper.ts

/**
 * @file Mapper contracts for transforming API payloads into domain entities.
 * @description
 * The concrete adapter (REST) will import these helpers to convert iTunes/lookup
 * responses into `Podcast` and `Episode` instances.
 */

import { Podcast } from "../../domain/entities/Podcast";
import { Episode } from "../../domain/entities/Episode";
import { PodcastId } from "../../domain/valueObjects/PodcastId";
import { EpisodeId } from "../../domain/valueObjects/EpisodeId";

/**
 * Shape of a minimal list entry from the Top 100 feed (normalized).
 */
export interface ExternalTopEntry {
  id: string;
  title: string;
  author: string;
  image: string;
  summary?: string;
}

/**
 * Shape of a minimal episode entry from lookup (normalized).
 */
export interface ExternalEpisodeEntry {
  id: string;
  podcastId: string;
  title: string;
  publishDateISO: string;
  durationMs?: number;
  descriptionHTML?: string;
  audioUrl?: string;
}

/**
 * Map a normalized external list item to a Podcast entity.
 */
export function mapToPodcast(entry: ExternalTopEntry): Podcast {
  return new Podcast({
    id: new PodcastId(entry.id),
    title: entry.title,
    author: entry.author,
    image: entry.image,
    summary: entry.summary,
  });
}

/**
 * Map a normalized external episode item to an Episode entity.
 */
export function mapToEpisode(entry: ExternalEpisodeEntry): Episode {
  return new Episode({
    id: new EpisodeId(entry.id),
    podcastId: new PodcastId(entry.podcastId),
    title: entry.title,
    publishDateISO: entry.publishDateISO,
    durationMs: entry.durationMs,
    descriptionHTML: entry.descriptionHTML,
    audioUrl: entry.audioUrl,
  });
}
