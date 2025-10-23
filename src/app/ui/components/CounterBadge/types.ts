// src/app/ui/components/CounterBadge/types.ts

/**
 * Props for the CounterBadge component.
 *
 * @property {number} count - Numeric value to display inside the badge.
 * @property {string} [className] - Additional CSS class names to append.
 * @property {string} [title] - Optional tooltip/title attribute for extra context.
 */
export type CounterBadgeProps = {
  count: number;
  className?: string;
  title?: string;
};
