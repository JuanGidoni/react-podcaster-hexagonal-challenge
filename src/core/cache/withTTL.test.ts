// src/core/cache/withTTL.test.ts

/**
 * @file Unit tests for withTTL helper.
 */

import { withTTL } from "./withTTL";
import type { Cache } from "./types";

class MemoryCache implements Cache {
  private m = new Map<string, unknown>();
  get<T>(k: string): T | undefined {
    return this.m.get(k) as T | undefined;
  }
  set<T>(k: string, v: T) {
    this.m.set(k, v);
  }
  delete(k: string) {
    this.m.delete(k);
  }
  clear() {
    this.m.clear();
  }
}

describe("withTTL", () => {
  it("returns cached value while fresh, reloads after TTL", async () => {
    jest.useFakeTimers();
    const cache = new MemoryCache();
    let loadCount = 0;

    const wrapped = withTTL(cache, "key", 1000, async () => {
      loadCount += 1;
      return `val-${loadCount}`;
    });

    // First call → loads
    await expect(wrapped()).resolves.toBe("val-1");
    // Second call within TTL → cached
    await expect(wrapped()).resolves.toBe("val-1");

    // Advance beyond TTL
    jest.advanceTimersByTime(1001);

    // Third call → reloads
    await expect(wrapped()).resolves.toBe("val-2");
    jest.useRealTimers();
  });
});
