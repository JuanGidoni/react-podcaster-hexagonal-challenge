// src/features/catalog/ui/pages/PodcastDetailPage/PodcastDetailPage.tsx

/**
 * @file PodcastDetailPage.tsx
 * @description
 * UI placeholder for the podcast detail view.
 * Displays a minimal layout with a heading and a counter slot (e.g., episodes).
 * Later this page will render the podcast sidebar (cover/title/author/description)
 * and an episodes table/list fetched via a use-case.
 */

import { JSX } from "react";
import { useParams } from "react-router-dom";
import { Container, CounterBadge } from "@/app/ui/components";
import type { PodcastDetailPageProps } from "./types";
import "./PodcastDetailPage.css";

/**
 * Podcast detail page (placeholder).
 *
 * @param {PodcastDetailPageProps} _props - Reserved for future enhancements.
 * @returns {JSX.Element} Placeholder layout for podcast details.
 */
export function PodcastDetailPage(_props: PodcastDetailPageProps): JSX.Element {
  const { podcastId = "" } = useParams();

  return (
    <Container as="section" className="podcast-detail">
      <header className="podcast-detail__header">
        <h2 className="podcast-detail__title">Podcast Detail</h2>
        <CounterBadge count={0} title="Episodes count (placeholder)" />
      </header>

      <div className="podcast-detail__content">
        <aside className="podcast-detail__sidebar">
          <div className="podcast-detail__cover" aria-hidden="true" />
          <div className="podcast-detail__meta">
            <p>
              <strong>ID:</strong> {podcastId}
            </p>
            <p>
              <strong>Title:</strong> (placeholder)
            </p>
            <p>
              <strong>Author:</strong> (placeholder)
            </p>
            <p className="podcast-detail__description">
              (Podcast short description placeholder)
            </p>
          </div>
        </aside>

        <section className="podcast-detail__main">
          <div className="podcast-detail__episodes">
            <h3>Episodes</h3>
            <p>(Episodes list/table placeholder)</p>
          </div>
        </section>
      </div>
    </Container>
  );
}
