// src/features/catalog/ui/pages/EpisodeDetailPage/EpisodeDetailPage.tsx

/**
 * @file EpisodeDetailPage.tsx
 * @description
 * Real episode detail page:
 *  - Loads podcast meta and episodes
 *  - Finds the current episode by id
 *  - Sanitizes HTML description
 *  - Renders a native <audio> player when audioUrl exists
 */

import { JSX, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, LoadingSpinner } from "@/app/ui/components";
import { useCases } from "@/core/di/container";
import { sanitizeHtml } from "@/core/utils/sanitizeHtml";
import "./EpisodeDetailPage.css";
import { toEpisodeDTO, toPodcastDTO } from "@/core/utils/normalizers";

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
  descriptionHTML?: string;
  audioUrl?: string;
};

export function EpisodeDetailPage(): JSX.Element {
  const { podcastId = "", episodeId = "" } = useParams();

  const [podcast, setPodcast] = useState<UiPodcast | null>(null);
  const [episodes, setEpisodes] = useState<UiEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // overall error
  const [episodesError, setEpisodesError] = useState<string | null>(null); // episodes-only error

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      setEpisodesError(null);
      const [metaRes, epsRes] = await Promise.allSettled([
        useCases.getPodcastDetail.execute(podcastId),
        useCases.getPodcastEpisodes.execute(podcastId),
      ]);

      if (!alive) return;

      // Meta result
      if (metaRes.status === "fulfilled") {
        setPodcast(metaRes.value ? toPodcastDTO(metaRes.value) : null);
      } else {
        console.error("Podcast meta load failed:", metaRes.reason);
        setError(
          metaRes.reason instanceof Error
            ? metaRes.reason.message
            : "Failed to load podcast meta."
        );
      }

      // Episodes result
      if (epsRes.status === "fulfilled") {
        setEpisodes(
          epsRes.value.map(toEpisodeDTO).filter(Boolean) as UiEpisode[]
        );
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

  const episode = useMemo(
    () => episodes.find((e) => e.id === episodeId) ?? null,
    [episodes, episodeId]
  );

  const safeDescription = useMemo(
    () => sanitizeHtml(episode?.descriptionHTML ?? ""),
    [episode?.descriptionHTML]
  );

  return (
    <Container as="section" className="episode-detail">
      <header className="episode-detail__header">
        <h2 className="episode-detail__title">
          {episode?.title ?? podcast?.title ?? "Episode Detail"}
        </h2>
      </header>

      {error && (
        <div role="alert" className="episode-detail__error">
          {error} &nbsp;<a href="/error">Details</a>
        </div>
      )}

      <div className="episode-detail__content">
        <aside className="episode-detail__sidebar">
          <div className="episode-detail__cover-wrap">
            {podcast?.image ? (
              <img
                src={podcast.image}
                alt={`${podcast.title} cover`}
                className="episode-detail__cover"
              />
            ) : (
              <div
                className="episode-detail__cover --placeholder"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="episode-detail__meta">
            <p>
              <strong>{podcast?.title ?? "(unknown)"}</strong>
            </p>
            <p>by {podcast?.author ?? "(unknown)"}</p>
          </div>
        </aside>

        <article className="episode-detail__main">
          {loading ? (
            <div className="episode-detail__loading">
              <LoadingSpinner ariaLabel="Loading episode" />
            </div>
          ) : (
            <>
              {episodesError && (
                <div role="status" className="episode-detail__error">
                  Episodes: {episodesError}
                </div>
              )}
              {episode ? (
                <>
                  <h3 className="episode-detail__episode-title">
                    {episode.title}
                  </h3>
                  <div
                    className="episode-detail__description"
                    dangerouslySetInnerHTML={{ __html: safeDescription }}
                  />
                  {episode.audioUrl ? (
                    <div className="episode-detail__player">
                      <audio controls preload="none" src={episode.audioUrl}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <p className="episode-detail__no-audio">
                      No audio available.
                    </p>
                  )}
                </>
              ) : (
                <p>Episode not found.</p>
              )}
            </>
          )}
        </article>
      </div>
    </Container>
  );
}
