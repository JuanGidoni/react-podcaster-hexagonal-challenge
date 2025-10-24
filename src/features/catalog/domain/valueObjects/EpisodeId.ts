// src/features/catalog/domain/valueObjects/EpisodeId.ts

/**
 * @file EpisodeId value object.
 * @description Type-safe wrapper for episode identifiers.
 */

export class EpisodeId {
  public readonly value: string;

  constructor(value: string) {
    if (!value || typeof value !== "string") {
      throw new Error("EpisodeIdInvalid");
    }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: EpisodeId): boolean {
    return this.value === other.value;
  }
}
