// src/features/catalog/domain/entities/Podcast.ts

/**
 * @file Podcast entity.
 * @description Domain representation of a podcast summary/detail.
 */

import { PodcastId } from "../valueObjects/PodcastId";

export interface PodcastProps {
  id: PodcastId;
  title: string;
  author: string;
  image: string;
  /** Optional short description/summary for sidebar. */
  summary?: string;
}

export class Podcast {
  private readonly props: Readonly<PodcastProps>;

  constructor(props: PodcastProps) {
    if (!props.title?.trim()) throw new Error("PodcastTitleEmpty");
    if (!props.author?.trim()) throw new Error("PodcastAuthorEmpty");
    if (!props.image?.trim()) throw new Error("PodcastImageEmpty");
    this.props = Object.freeze({ ...props });
  }

  get id(): PodcastId {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get author(): string {
    return this.props.author;
  }
  get image(): string {
    return this.props.image;
  }
  get summary(): string | undefined {
    return this.props.summary;
  }

  /** JSON-ready snapshot for UI/serialization. */
  toJSON() {
    return {
      id: this.id.toString(),
      title: this.title,
      author: this.author,
      image: this.image,
      summary: this.summary,
    };
  }
}
