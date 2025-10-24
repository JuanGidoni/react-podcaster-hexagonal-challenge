// src/features/catalog/domain/entities/Episode.test.ts

/**
 * @file Unit tests for Episode entity.
 */

import { Episode } from "./Episode";
import { EpisodeId } from "../valueObjects/EpisodeId";
import { PodcastId } from "../valueObjects/PodcastId";

describe("Episode", () => {
  it("creates an Episode with required fields", () => {
    const e = new Episode({
      id: new EpisodeId("e1"),
      podcastId: new PodcastId("p1"),
      title: "Intro",
      publishDateISO: "2024-05-10T00:00:00Z",
      durationMs: 90_000,
    });
    expect(e.toJSON()).toMatchObject({
      id: "e1",
      podcastId: "p1",
      title: "Intro",
    });
  });

  it("throws on invalid date", () => {
    expect(
      () =>
        new Episode({
          id: new EpisodeId("e1"),
          podcastId: new PodcastId("p1"),
          title: "Bad",
          publishDateISO: "not-a-date",
        })
    ).toThrow("EpisodeDateInvalid");
  });
});
