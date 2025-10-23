// src/features/catalog/domain/entities/Podcast.test.ts

/**
 * @file Unit tests for Podcast entity.
 */

import { Podcast } from "./Podcast";
import { PodcastId } from "../valueObjects/PodcastId";

describe("Podcast", () => {
  it("creates a Podcast with required fields", () => {
    const p = new Podcast({
      id: new PodcastId("1"),
      title: "React Universe",
      author: "Carlos Vega",
      image: "https://example.com/img.jpg",
      summary: "A show about React.",
    });
    expect(p.toJSON()).toMatchObject({
      id: "1",
      title: "React Universe",
      author: "Carlos Vega",
    });
  });

  it("throws on empty title", () => {
    expect(
      () =>
        new Podcast({
          id: new PodcastId("1"),
          title: "",
          author: "A",
          image: "x",
        })
    ).toThrow("PodcastTitleEmpty");
  });
});
