// src/features/catalog/ui/components/EpisodeCard/types.ts

/**
 * @file EpisodeCard types.
 */

/**
 * Props for the EpisodeCard component.
 */
export interface EpisodeCardProps {
  id: string;
  title: string;
  /**
   * Episode publication date in ISO format (e.g., "2023-10-12T00:00:00Z").
   */
  dateISO: string;
  /**
   * Episode duration in milliseconds. Optional.
   */
  durationMs?: number;
  /**
   * Invoked when the row is activated (click/Enter/Space on the button).
   */
  onSelect?: () => void;
  className?: string;
}
