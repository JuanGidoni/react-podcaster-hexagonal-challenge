// src/core/di/container.ts

/**
 * @file DI container (very light)
 * @description Wires ports to adapters and exposes singletons for use-cases.
 * - HttpClient: FetchHttpClient (optionally with CORS proxy)
 * - Cache: LocalStorageCache
 * - Repository: RestPodcastRepository
 * - Use-cases: GetTop100Podcasts, GetPodcastDetail, GetPodcastEpisodes
 */

import { FetchHttpClient } from "@/core/http/FetchHttpClient";
import { LocalStorageCache } from "@/core/cache/LocalStorageCache";
import { RestPodcastRepository } from "@/features/catalog/infra/adapters/RestPodcastRepository";

import { GetTop100Podcasts } from "@/features/catalog/application/useCases/GetTop100Podcasts";
import { GetPodcastDetail } from "@/features/catalog/application/useCases/GetPodcastDetail";
import { GetPodcastEpisodes } from "@/features/catalog/application/useCases/GetPodcastEpisodes";

// Optional: set a proxy if you need CORS help (e.g., AllOrigins RAW endpoint)
// Leave empty string ('') to disable proxying.
const CORS_PROXY = ""; // e.g., 'https://api.allorigins.win/raw?url='

const http = new FetchHttpClient({ proxyUrl: CORS_PROXY, timeoutMs: 8000 });
const cache = new LocalStorageCache();

const repo = new RestPodcastRepository(http, cache, {
  cachePrefix: "podcaster:",
  ttlMs: 24 * 60 * 60 * 1000, // 24h
});

export const useCases = {
  getTop100: new GetTop100Podcasts(repo),
  getPodcastDetail: new GetPodcastDetail(repo),
  getPodcastEpisodes: new GetPodcastEpisodes(repo),
};
