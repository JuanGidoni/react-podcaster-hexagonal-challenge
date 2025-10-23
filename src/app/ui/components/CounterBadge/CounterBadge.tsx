// src/app/ui/components/CounterBadge/CounterBadge.tsx

import { JSX } from "react";
import "./CounterBadge.css";
import type { CounterBadgeProps } from "./types";

/**
 * Compact pill-shaped badge for displaying small numeric counters.
 *
 * - Useful for showing totals (e.g., number of episodes).
 * - Accessible text is the raw number; add `title` for extra hints if needed.
 *
 * @param {CounterBadgeProps} props - Badge count and optional styling.
 * @returns {JSX.Element} The counter badge element.
 *
 * @example
 * <CounterBadge count={42} title="Episode count" />
 */
export function CounterBadge({
  count,
  className = "",
  title,
}: CounterBadgeProps): JSX.Element {
  return (
    <span
      className={`counter-badge ${className}`.trim()}
      aria-label={`${count}`}
      title={title}
    >
      {count}
    </span>
  );
}
