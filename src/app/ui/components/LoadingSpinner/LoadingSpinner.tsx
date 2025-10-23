// src/app/ui/components/LoadingSpinner/LoadingSpinner.ts

import { JSX } from "react";
import type { LoadingSpinnerProps } from "./types";
import "./LoadingSpinner.css";

/**
 * Accessible, dependency-free loading spinner for global or inline use.
 *
 * - Uses `role="status"` and an `aria-label` for assistive technologies.
 * - Pure CSS animation; no external libraries.
 * - Suitable for showing navigation/loading states in headers or content areas.
 *
 * @param {LoadingSpinnerProps} props - Spinner configuration and labeling.
 * @returns {JSX.Element} The loading spinner element.
 *
 * @example
 * // Inline spinner with custom size
 * <LoadingSpinner size={20} ariaLabel="Fetching data" />
 */
export function LoadingSpinner({
  size = 18,
  stroke = 2,
  ariaLabel = "Loading",
  inline = true,
  className = "",
}: LoadingSpinnerProps): JSX.Element {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: stroke,
  };
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`spinner ${inline ? "spinner--inline" : "spinner--block"} ${className}`.trim()}
    >
      <span className="spinner__wheel" style={style}></span>
    </span>
  );
}
