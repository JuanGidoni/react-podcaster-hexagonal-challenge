// src/app/ui/components/Header/types.ts

/**
 * Props for the Header component.
 *
 * @property {string} [title='Podcaster'] - Main heading text displayed in the header.
 * @property {() => void} [onTitleClick] - Callback triggered when the title is clicked (e.g., navigate to "/").
 * @property {React.ReactNode} [rightSlot] - Optional right-aligned content (e.g., a spinner or badge).
 * @property {string} [className] - Additional CSS class names to append.
 */
export type HeaderProps = {
  title?: string;
  onTitleClick?: () => void;
  rightSlot?: React.ReactNode;
  className?: string;
};
