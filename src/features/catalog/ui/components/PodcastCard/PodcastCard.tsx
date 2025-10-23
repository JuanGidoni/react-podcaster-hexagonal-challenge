// src/features/catalog/ui/components/PodcastCard/PodcastCard.tsx

/**
 * @file PodcastCard.tsx
 * @description
 * Presentational card for a podcast item (cover, title, author).
 * Pure UI: no routing or data fetching; navigation is delegated via `onSelect`.
 */

import { JSX } from "react";
import "./PodcastCard.css";
import type { PodcastCardProps } from "./types";

/**
 * Podcast card component.
 *
 * @param {PodcastCardProps} props - Podcast metadata and selection handler.
 * @returns {JSX.Element} A clickable, accessible card.
 */
export function PodcastCard({
  id,
  title,
  author,
  image,
  onSelect,
  className = "",
}: PodcastCardProps): JSX.Element {
  return (
    <button
      type="button"
      className={`podcast-card ${className}`.trim()}
      onClick={onSelect}
      aria-label={`Open podcast ${title} by ${author}`}
      data-podcast-id={id}
    >
      <figure className="podcast-card__figure">
        <img
          src={image}
          alt={`${title} cover`}
          className="podcast-card__image"
          loading="lazy"
        />
        <figcaption className="podcast-card__caption">
          <h3 className="podcast-card__title">{title}</h3>
          <p className="podcast-card__author">{author}</p>
        </figcaption>
      </figure>
    </button>
  );
}
