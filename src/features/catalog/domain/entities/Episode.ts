// src/features/catalog/domain/entities/Episode.ts

/**
 * @file Episode entity.
 * @description Domain representation of a podcast episode.
 */

import { EpisodeId } from "../valueObjects/EpisodeId";
import { PodcastId } from "../valueObjects/PodcastId";

export interface EpisodeProps {
  id: EpisodeId;
  podcastId: PodcastId;
  title: string;
  /** ISO publish date string (UTC). */
  publishDateISO: string;
  /** Duration in milliseconds (optional if unknown). */
  durationMs?: number;
  /** HTML description (to be sanitized by UI layer). */
  descriptionHTML?: string;
  /** Optional enclosure audio URL. */
  audioUrl?: string;
}

export class Episode {
  private readonly props: Readonly<EpisodeProps>;

  constructor(props: EpisodeProps) {
    if (!props.title?.trim()) throw new Error("EpisodeTitleEmpty");
    if (!props.publishDateISO?.trim()) throw new Error("EpisodeDateEmpty");
    // Basic date validation (entity-level, not parsing-heavy)
    if (isNaN(new Date(props.publishDateISO).getTime())) {
      throw new Error("EpisodeDateInvalid");
    }
    this.props = Object.freeze({ ...props });
  }

  get id() {
    return this.props.id;
  }
  get podcastId() {
    return this.props.podcastId;
  }
  get title() {
    return this.props.title;
  }
  get publishDateISO() {
    return this.props.publishDateISO;
  }
  get durationMs() {
    return this.props.durationMs;
  }
  get descriptionHTML() {
    return this.props.descriptionHTML;
  }
  get audioUrl() {
    return this.props.audioUrl;
  }

  toJSON() {
    return {
      id: this.id.toString(),
      podcastId: this.podcastId.toString(),
      title: this.title,
      publishDateISO: this.publishDateISO,
      durationMs: this.durationMs,
      descriptionHTML: this.descriptionHTML,
      audioUrl: this.audioUrl,
    };
  }
}
