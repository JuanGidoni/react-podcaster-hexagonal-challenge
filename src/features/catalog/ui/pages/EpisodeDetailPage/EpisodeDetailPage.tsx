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
import { useAppLoading } from "@/app/context/AppLoadingContext";

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
  const { loading, setLoading } = useAppLoading();

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const [metaRes, epsRes] = await Promise.allSettled([
        useCases.getPodcastDetail.execute(podcastId),
        useCases.getPodcastEpisodes.execute(podcastId),
      ]);

      if (!alive) return;

      if (metaRes.status === "fulfilled") {
        setPodcast(metaRes.value ? toPodcastDTO(metaRes.value) : null);
      } else {
        console.error("Podcast meta load failed:", metaRes.reason);
      }

      if (epsRes.status === "fulfilled") {
        setEpisodes(
          epsRes.value.map(toEpisodeDTO).filter(Boolean) as UiEpisode[]
        );
      } else {
        console.error("Episodes load failed:", epsRes.reason);
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
          <>
            {!loading && episode ? (
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
        </article>
      </div>
    </Container>
  );
}
