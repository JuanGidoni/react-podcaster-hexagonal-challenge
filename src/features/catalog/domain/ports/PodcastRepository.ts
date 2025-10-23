// src/features/catalog/domain/ports/PodcastRepository.ts

/**
 * @file PodcastRepository port.
 * @description Domain contract for querying podcasts and episodes.
 */

import { Podcast } from "../entities/Podcast";
import { Episode } from "../entities/Episode";
import { PodcastId } from "../valueObjects/PodcastId";

export interface PodcastRepository {
  /** Top charts / catalog list. */
  getTop100(): Promise<Podcast[]>;

  /** Podcast meta/summary (id, title, author, cover, summary). */
  getPodcastDetail(podcastId: PodcastId): Promise<Podcast | null>;

  /** Episodes list for a podcast (paged or capped by adapter). */
  getPodcastEpisodes(podcastId: PodcastId): Promise<Episode[]>;
}
