// src/features/catalog/ui/pages/PodcastDetailPage/PodcastDetailPage.tsx

/**
 * @file PodcastDetailPage.tsx
 * @description
 * Real podcast detail page:
 *  - Fetches podcast meta and episodes via use-cases (DI container)
 *  - Shows loading and error states
 *  - Renders a simple episodes list using <EpisodeCard />
 */

import { JSX, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, ItemsIndicator, LoadingSpinner } from "@/app/ui/components";
import { EpisodeCard } from "@/features/catalog/ui/components";
import { useCases } from "@/core/di/container";
import "./PodcastDetailPage.css";

type UiPodcast = {
  id: string;
  title: string;
  author: string;
  image: string;
  summary?: string;
};
type UiEpisode = {
  id: string;
  podcastId: string;
  title: string;
  publishDateISO: string;
  durationMs?: number;
};

export function PodcastDetailPage(): JSX.Element {
  const { podcastId = "" } = useParams();
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState<UiPodcast | null>(null);
  const [episodes, setEpisodes] = useState<UiEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [meta, eps] = await Promise.all([
          useCases.getPodcastDetail.execute(podcastId),
          useCases.getPodcastEpisodes.execute(podcastId),
        ]);
        if (!alive) return;
        setPodcast(meta ? meta.toJSON() : null);
        setEpisodes(eps.map((e) => e.toJSON() as UiEpisode));
      } catch (e) {
        if (!alive) return;
        setError("Failed to load podcast data.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [podcastId]);

  const title = podcast?.title ?? "Podcast Detail";
  const count = episodes.length;

  const sortedEpisodes = useMemo(
    () =>
      [...episodes].sort((a, b) =>
        a.publishDateISO > b.publishDateISO ? -1 : 1
      ),
    [episodes]
  );

  return (
    <Container as="section" className="podcast-detail">
      <header className="podcast-detail__header">
        <h2 className="podcast-detail__title">{title}</h2>
        {loading ? (
          <LoadingSpinner ariaLabel="Loading episodes" />
        ) : (
          <ItemsIndicator count={count} singular="episode" plural="episodes" />
        )}
      </header>

      {error && (
        <div role="alert" className="podcast-detail__error">
          {error}
        </div>
      )}

      <div className="podcast-detail__content">
        <aside className="podcast-detail__sidebar">
          <div className="podcast-detail__cover-wrap">
            {podcast?.image ? (
              <img
                src={podcast.image}
                alt={`${podcast.title} cover`}
                className="podcast-detail__cover"
              />
            ) : (
              <div
                className="podcast-detail__cover --placeholder"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="podcast-detail__meta">
            <p className="podcast-detail__meta-title">
              <strong>{podcast?.title ?? "(unknown)"}</strong>
            </p>
            <p className="podcast-detail__meta-author">
              by {podcast?.author ?? "(unknown)"}
            </p>
            {podcast?.summary && (
              <p className="podcast-detail__description">{podcast.summary}</p>
            )}
          </div>
        </aside>

        <section className="podcast-detail__main">
          {loading ? (
            <div className="podcast-detail__loading">
              <LoadingSpinner ariaLabel="Loading episodes" />
            </div>
          ) : (
            <div className="podcast-detail__episodes">
              {sortedEpisodes.length === 0 ? (
                <p>No episodes found.</p>
              ) : (
                <ul className="podcast-detail__episodes-list">
                  {sortedEpisodes.map((ep) => (
                    <li key={ep.id}>
                      <EpisodeCard
                        id={ep.id}
                        title={ep.title}
                        dateISO={ep.publishDateISO}
                        durationMs={ep.durationMs}
                        onSelect={() =>
                          navigate(`/podcast/${podcastId}/episode/${ep.id}`)
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
