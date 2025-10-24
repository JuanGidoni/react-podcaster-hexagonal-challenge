// src/features/catalog/infra/adapters/InMemoryPodcastRepository.ts

/**
 * @file InMemoryPodcastRepository (tests/dev)
 * @description Simple in-memory repository for unit/integration tests.
 */

import type { PodcastRepository } from "../../domain/ports/PodcastRepository";
import { Podcast } from "../../domain/entities/Podcast";
import { Episode } from "../../domain/entities/Episode";
import { PodcastId } from "../../domain/valueObjects/PodcastId";

export class InMemoryPodcastRepository implements PodcastRepository {
  constructor(
    private list: Podcast[] = [],
    private byId: Map<string, Podcast | null> = new Map(),
    private episodesBy: Map<string, Episode[]> = new Map()
  ) {}

  async getTop100(): Promise<Podcast[]> {
    return this.list;
  }
  async getPodcastDetail(podcastId: PodcastId): Promise<Podcast | null> {
    return this.byId.get(podcastId.toString()) ?? null;
  }
  async getPodcastEpisodes(podcastId: PodcastId): Promise<Episode[]> {
    return this.episodesBy.get(podcastId.toString()) ?? [];
  }
}
