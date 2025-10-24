// src/core/cache/withTTL.ts

/**
 * @file withTTL helper.
 * @description
 * Wraps a loader function with client-side caching + time-to-live (ms).
 * Uses a provided Cache implementation (e.g., LocalStorageCache).
 */

import type { Cache } from "./types";

export interface TTLRecord<T> {
  /** Timestamp (ms since epoch) when the value was stored. */
  t: number;
  /** Cached value. */
  v: T;
}

/**
 * Returns a function that, when called, tries to return a cached value if still "fresh".
 *
 * @param cache - Cache adapter (must support get/set).
 * @param key - Unique cache key.
 * @param ttlMs - Time-to-live in milliseconds.
 * @param loader - Function to load the value when cache is stale/absent.
 */
export function withTTL<T>(
  cache: Cache,
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): () => Promise<T> {
  return async () => {
    const now = Date.now();
    const rec = cache.get<TTLRecord<T>>(key);
    if (rec && now - rec.t < ttlMs) {
      return rec.v;
    }
    const v = await loader();
    cache.set<TTLRecord<T>>(key, { t: now, v });
    return v;
  };
}
