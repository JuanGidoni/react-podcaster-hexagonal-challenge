// src/features/catalog/domain/valueObjects/PodcastId.ts

/**
 * @file PodcastId value object.
 * @description Type-safe wrapper for podcast identifiers.
 */

/**
 * Strongly-typed podcast identifier.
 */
export class PodcastId {
  /** Underlying raw id value. */
  public readonly value: string;

  constructor(value: string) {
    if (!value || typeof value !== "string") {
      throw new Error("PodcastIdInvalid");
    }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: PodcastId): boolean {
    return this.value === other.value;
  }
}
