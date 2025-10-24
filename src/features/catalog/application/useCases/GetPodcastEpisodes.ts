// src/features/catalog/application/useCases/GetPodcastEpisodes.ts

/**
 * @file GetPodcastEpisodes use-case
 * @description Returns the list of episodes for a given podcast id.
 */

import type { PodcastRepository } from "../../domain/ports/PodcastRepository";
import type { Episode } from "../../domain/entities/Episode";
import { PodcastId } from "../../domain/valueObjects/PodcastId";

export class GetPodcastEpisodes {
  constructor(private readonly repo: PodcastRepository) {}

  async execute(podcastId: string): Promise<Episode[]> {
    return this.repo.getPodcastEpisodes(new PodcastId(podcastId));
  }
}
