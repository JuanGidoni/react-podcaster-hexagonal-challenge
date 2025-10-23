// src/app/ui/components/ItemsIndicator/ItemsIndicator.tsx

/**
 * @file ItemsIndicator.tsx
 * @description
 * Compact indicator that displays a numeric count with a short label
 * (e.g., "5 items"), wrapping the shared <CounterBadge /> component.
 */

import { JSX } from "react";
import "./ItemsIndicator.css";
import type { ItemsIndicatorProps } from "./types";
import { CounterBadge } from "@/app/ui/components";

/**
 * ItemsIndicator component.
 *
 * @param {ItemsIndicatorProps} props - Count and labeling options.
 * @returns {JSX.Element} A compact count + label indicator.
 */
export function ItemsIndicator({
  count,
  singular = "item",
  plural = "items",
  className = "",
  ariaLive = "polite",
  title,
}: ItemsIndicatorProps): JSX.Element {
  const label = count === 1 ? singular : plural;
  return (
    <div
      className={`items-indicator ${className}`.trim()}
      aria-live={ariaLive}
      title={title}
    >
      <CounterBadge count={count} />
      <span className="items-indicator__label">{label}</span>
    </div>
  );
}
