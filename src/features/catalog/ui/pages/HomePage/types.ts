// src/features/catalog/ui/pages/HomePage/types.ts

/**
 * @file HomePage types.
 * @description Type definitions for the HomePage component and mock data.
 */

/**
 * Represents a podcast item displayed in the catalog list.
 * (Renamed to avoid clashing with the UI component name `PodcastCard`.)
 */
export interface CatalogPodcast {
  id: string;
  title: string;
  author: string;
  image: string;
}

/**
 * Props for the HomePage component.
 *
 * @property {CatalogPodcast[]} [initialData] - Optional list for testing/SSR.
 */
export interface HomePageProps {
  initialData?: CatalogPodcast[];
}
