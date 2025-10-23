// src/features/catalog/ui/components/EpisodeCard/EpisodeCard.tsx

/**
 * @file EpisodeCard.tsx
 * @description
 * Presentational row/card for an episode: title, date, duration.
 * Pure UI with an `onSelect` callback for navigation.
 */

import { JSX } from "react";
import "./EpisodeCard.css";
import type { EpisodeCardProps } from "./types";
import { formatDuration } from "@/core/utils/formats";

/**
 * Episode row/card component.
 *
 * @param {EpisodeCardProps} props - Episode metadata and selection handler.
 * @returns {JSX.Element} A button-styled row for list/table layouts.
 */
export function EpisodeCard({
  id,
  title,
  dateISO,
  durationMs,
  onSelect,
  className = "",
}: EpisodeCardProps): JSX.Element {
  const date = new Date(dateISO);
  const formattedDate = isNaN(date.getTime())
    ? dateISO
    : new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

  return (
    <button
      type="button"
      className={`episode-card ${className}`.trim()}
      onClick={onSelect}
      aria-label={`Open episode ${title}`}
      data-episode-id={id}
    >
      <span className="episode-card__title">{title}</span>
      <span className="episode-card__date">{formattedDate}</span>
      <span className="episode-card__duration">
        {formatDuration(durationMs)}
      </span>
    </button>
  );
}
