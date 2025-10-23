// src/features/catalog/application/useCases/GetTop100Podcasts.ts

/**
 * @file GetTop100Podcasts use-case
 * @description Returns the top 100 podcasts from the repository.
 */

import type { PodcastRepository } from "../../domain/ports/PodcastRepository";
import type { Podcast } from "../../domain/entities/Podcast";

export class GetTop100Podcasts {
  constructor(private readonly repo: PodcastRepository) {}

  async execute(): Promise<Podcast[]> {
    return this.repo.getTop100();
  }
}
