// src/features/catalog/ui/pages/EpisodeDetailPage/EpisodeDetailPage.tsx

/**
 * @file EpisodeDetailPage.tsx
 * @description
 * UI placeholder for the episode detail view of a given podcast.
 * Later this page will render the podcast sidebar and the selected episode
 * with sanitized HTML description and an <audio> player bound to the enclosure URL.
 */

import { useParams } from "react-router-dom";
import { Container } from "@/app/ui/components";
import type { EpisodeDetailPageProps } from "./types";
import "./EpisodeDetailPage.css";
import { JSX } from "react";

/**
 * Episode detail page (placeholder).
 *
 * @param {EpisodeDetailPageProps} _props - Reserved for future enhancements.
 * @returns {JSX.Element} Placeholder layout for episode details.
 */
export function EpisodeDetailPage(_props: EpisodeDetailPageProps): JSX.Element {
  const { podcastId = "", episodeId = "" } = useParams();

  return (
    <Container as="section" className="episode-detail">
      <header className="episode-detail__header">
        <h2 className="episode-detail__title">Episode Detail</h2>
      </header>

      <div className="episode-detail__content">
        <aside className="episode-detail__sidebar">
          <div className="episode-detail__cover" aria-hidden="true" />
          <div className="episode-detail__meta">
            <p>
              <strong>Podcast ID:</strong> {podcastId}
            </p>
            <p>
              <strong>Podcast Title:</strong> (placeholder)
            </p>
            <p>
              <strong>Author:</strong> (placeholder)
            </p>
          </div>
        </aside>

        <article className="episode-detail__main">
          <h3 className="episode-detail__episode-title">
            (Episode title placeholder)
          </h3>
          <div className="episode-detail__description">
            (Episode description placeholder — will render sanitized HTML)
          </div>

          <div className="episode-detail__player">
            <p>
              (Audio player placeholder — will bind to episode enclosure URL)
            </p>
          </div>

          <p className="episode-detail__id">
            <strong>Episode ID:</strong> {episodeId}
          </p>
        </article>
      </div>
    </Container>
  );
}
