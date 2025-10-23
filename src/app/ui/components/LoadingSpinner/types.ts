// src/app/ui/components/LoadingSpinner/types.ts

/**
 * Props for the LoadingSpinner component.
 *
 * @property {number} [size=18] - Spinner width/height in pixels.
 * @property {number} [stroke=2] - Spinner border thickness in pixels.
 * @property {string} [ariaLabel='Loading'] - Accessible label announced by screen readers.
 * @property {boolean} [inline=true] - If true, renders inline; otherwise, block-level.
 * @property {string} [className] - Additional CSS class names to append.
 */
export type LoadingSpinnerProps = {
  size?: number;
  stroke?: number;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
};
