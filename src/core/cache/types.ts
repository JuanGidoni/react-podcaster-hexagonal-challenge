// src/core/cache/Cache.ts

/**
 * @file Cache port.
 * @description
 * Small key-value cache abstraction (string keys). Values must be JSON-serializable.
 */

export interface Cache {
  /** Reads a value by key. Returns `undefined` when absent. */
  get<T = unknown>(key: string): T | undefined;
  /** Writes a value by key. `value` must be JSON-serializable. */
  set<T = unknown>(key: string, value: T): void;
  /** Removes a key. */
  delete(key: string): void;
  /** Clears the entire cache. */
  clear(): void;
}
