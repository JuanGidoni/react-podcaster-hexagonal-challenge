// src/features/catalog/ui/pages/HomePage/HomePage.tsx

/**
 * @file HomePage.tsx
 * @description
 * The HomePage displays the top podcasts list and allows filtering by title or author.
 * For now it uses local mock data; later it will fetch data through a use-case.
 */

import { useState, useMemo, JSX } from "react";
import { Container, SearchInput, CounterBadge } from "@/app/ui/components";
import type { HomePageProps, PodcastCard } from "./types";
import { mockPodcasts } from "./mockPodcasts";
import "./HomePage.css";

/**
 * Displays the main catalog of podcasts with a search filter.
 *
 * @param {HomePageProps} props - Optional initial data for testing or SSR.
 * @returns {JSX.Element} Home page component.
 */
export function HomePage({
  initialData = mockPodcasts,
}: HomePageProps): JSX.Element {
  const [query, setQuery] = useState("");

  /** Filter podcasts by title or author (case-insensitive). */
  const filtered: PodcastCard[] = useMemo(() => {
    const q = query.toLowerCase();
    return initialData.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
    );
  }, [query, initialData]);

  return (
    <Container as="section" className="home">
      <div className="home__topbar">
        <CounterBadge count={filtered.length} title="Podcasts count" />
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Filter podcasts..."
        />
      </div>

      <ul className="home__grid" data-testid="podcast-list">
        {filtered.map((podcast) => (
          <li key={podcast.id} className="home__card">
            <img
              src={podcast.image}
              alt={`${podcast.title} cover`}
              className="home__image"
              loading="lazy"
            />
            <div className="home__info">
              <h3 className="home__title">{podcast.title}</h3>
              <p className="home__author">{podcast.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
