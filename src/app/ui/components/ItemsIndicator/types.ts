// src/app/ui/components/ItemsIndicator/types.ts

/**
 * @file ItemsIndicator types.
 */

/**
 * Props for the ItemsIndicator component.
 */
export interface ItemsIndicatorProps {
  /** Numeric count to display. */
  count: number;
  /** Singular label (defaults to "item"). */
  singular?: string;
  /** Plural label (defaults to "items"). */
  plural?: string;
  /** Additional CSS classes. */
  className?: string;
  /** aria-live politeness; defaults to "polite". */
  ariaLive?: "off" | "polite" | "assertive";
  /** Optional tooltip/title text. */
  title?: string;
}
