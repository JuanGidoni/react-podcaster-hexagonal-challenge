// src/app/ui/components/Container/types.ts

import { JSX } from "react";

/**
 * Props for the Container component.
 *
 * @property {keyof JSX.IntrinsicElements} [as='main'] - HTML tag to render (e.g., 'main', 'section', 'div').
 * @property {React.ReactNode} children - Content to wrap inside the container.
 * @property {string} [className] - Additional CSS class names to append.
 */
export type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};
