// src/features/catalog/ui/components/PodcastCard/types.ts

/**
 * @file PodcastCard types.
 */

/**
 * Props for the PodcastCard component.
 */
export interface PodcastCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
  /**
   * Invoked when the card is activated (click/Enter/Space on the button).
   * Use this to navigate at the page/screen level.
   */
  onSelect?: () => void;
  className?: string;
}
