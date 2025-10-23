// src/features/catalog/ui/pages/HomePage/types.ts

/**
 * @file HomePage types.
 * @description Type definitions for the HomePage component and mock data.
 */

/**
 * Represents a podcast item displayed in the catalog list.
 */
export interface PodcastCard {
  id: string;
  title: string;
  author: string;
  image: string;
}

/**
 * Props for the HomePage component.
 *
 * @property {PodcastCard[]} [initialData] - Optional list of podcasts (for testing or SSR).
 */
export interface HomePageProps {
  initialData?: PodcastCard[];
}
