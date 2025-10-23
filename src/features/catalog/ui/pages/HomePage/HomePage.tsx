// src/features/catalog/ui/pages/HomePage/HomePage.tsx

import { JSX, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SearchInput, ItemsIndicator } from "@/app/ui/components";
import { PodcastCard as PodcastItemCard } from "@/features/catalog/ui/components";
import type { CatalogPodcast } from "./types";
import "./HomePage.css";
import { useCases } from "@/core/di/container";

export function HomePage(): JSX.Element {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<CatalogPodcast[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    useCases.getTop100.execute().then((list) => {
      if (!alive) return;
      setData(list.map((p) => p.toJSON()));
    });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
    );
  }, [query, data]);

  return (
    <Container as="section" className="home">
      <div className="home__topbar">
        <ItemsIndicator
          count={filtered.length}
          title="Current filtered count"
        />
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Filter podcasts..."
        />
      </div>
      <div className="home__grid" data-testid="podcast-list">
        {filtered.map((p) => (
          <PodcastItemCard
            key={p.id}
            id={p.id}
            title={p.title}
            author={p.author}
            image={p.image}
            onSelect={() => navigate(`/podcast/${p.id}`)}
          />
        ))}
      </div>
    </Container>
  );
}
