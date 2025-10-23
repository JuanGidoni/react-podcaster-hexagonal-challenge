// src/core/cache/LocalStorageCache.ts

/**
 * @file LocalStorageCache adapter.
 * @description
 * Cache implementation using `window.localStorage`.
 * Values are stored serialized as JSON under the provided key.
 */

import type { Cache } from "./types";

export class LocalStorageCache implements Cache {
  private readonly storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  get<T = unknown>(key: string): T | undefined {
    const raw = this.storage.getItem(key);
    if (raw == null) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      this.storage.removeItem(key);
      return undefined;
    }
  }

  set<T = unknown>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  delete(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
