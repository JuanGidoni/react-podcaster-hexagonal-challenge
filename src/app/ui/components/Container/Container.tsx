// src/app/ui/components/Container/Container.tsx

import type { ContainerProps } from "./types";
import "./Container.css";
import { JSX } from "react";

/**
 * Responsive, centered content wrapper with consistent horizontal padding and max-width.
 *
 * - Keeps page content aligned and readable across breakpoints.
 * - Allows customizing the underlying HTML tag via the `as` prop.
 *
 * @param {ContainerProps} props - Element type, children, and className.
 * @returns {JSX.Element} The container element.
 *
 * @example
 * <Container as="section">
 *   <h2>Top Podcasts</h2>
 *   <PodcastGrid />
 * </Container>
 */
export function Container({
  as: Tag = "main",
  children,
  className = "",
}: ContainerProps): JSX.Element {
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>;
}
