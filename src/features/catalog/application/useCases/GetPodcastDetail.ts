// src/features/catalog/application/useCases/GetPodcastDetail.ts

/**
 * @file GetPodcastDetail use-case
 * @description Returns podcast metadata by id (or null if not found).
 */

import type { PodcastRepository } from "../../domain/ports/PodcastRepository";
import type { Podcast } from "../../domain/entities/Podcast";
import { PodcastId } from "../../domain/valueObjects/PodcastId";

export class GetPodcastDetail {
  constructor(private readonly repo: PodcastRepository) {}

  async execute(podcastId: string): Promise<Podcast | null> {
    return this.repo.getPodcastDetail(new PodcastId(podcastId));
  }
}
