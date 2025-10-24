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
import { UiPodcast } from "@/features/catalog/domain/entities/Podcast";
import { UiEpisode } from "@/features/catalog/domain/entities/Episode";
import { toEpisodeDTO, toPodcastDTO } from "@/core/utils/normalizers";

export function PodcastDetailPage(): JSX.Element {
  const { podcastId = "" } = useParams();
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState<UiPodcast | null>(null);
  const [episodes, setEpisodes] = useState<UiEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  const [metaError, setMetaError] = useState<string | null>(null);
  const [episodesError, setEpisodesError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setMetaError(null);
      setEpisodesError(null);

      const [metaRes, epsRes] = await Promise.allSettled([
        useCases.getPodcastDetail.execute(podcastId),
        useCases.getPodcastEpisodes.execute(podcastId),
      ]);

      if (!alive) return;

      if (metaRes.status === "fulfilled") {
        setPodcast(toPodcastDTO(metaRes.value));
      } else {
        console.error("Podcast meta load failed:", metaRes.reason);
        setMetaError(
          metaRes.reason instanceof Error
            ? metaRes.reason.message
            : "Failed to load podcast data."
        );
      }

      if (epsRes.status === "fulfilled") {
        const list = (epsRes.value as any[])
          .map(toEpisodeDTO)
          .filter(Boolean) as UiEpisode[];
        list.sort((a, b) => (a.publishDateISO > b.publishDateISO ? -1 : 1));
        setEpisodes(list);
      } else {
        console.error("Episodes load failed:", epsRes.reason);
        setEpisodesError(
          epsRes.reason instanceof Error
            ? epsRes.reason.message
            : "Failed to load episodes."
        );
      }

      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, [podcastId]);

  const title = podcast?.title ?? "Podcast Detail";
  const count = episodes.length;
  const showNoEpisodes = !loading && !episodesError && count === 0;

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

      {metaError && !podcast && (
        <div role="alert" className="podcast-detail__error">
          {metaError} &nbsp;<a href="/error">Details</a>
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
              {episodesError && (
                <div role="alert" className="podcast-detail__error">
                  {episodesError} &nbsp;<a href="/error">Details</a>
                </div>
              )}

              {showNoEpisodes ? (
                <p>No episodes found.</p>
              ) : (
                <ul className="podcast-detail__episodes-list">
                  {episodes.map((ep) => (
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
