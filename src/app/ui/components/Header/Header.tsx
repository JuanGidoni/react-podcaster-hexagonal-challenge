// src/app/ui/components/Header/Header.tsx

import { JSX } from "react";
import "./Header.css";
import type { HeaderProps } from "./types";
import { HeaderLoadingDot } from "../HeaderLoadingDot/HeaderLoadingDot";

/**
 * Sticky application header with a clickable title and an optional right-aligned slot.
 *
 * - Keeps the title keyboard-accessible (button semantics).
 * - Designed to host a navigation/loading indicator on the right side.
 * - Uses plain CSS and no external UI libraries.
 *
 * @param {HeaderProps} props - Header configuration, title, and right slot content.
 * @returns {JSX.Element} Header layout element.
 *
 * @example
 * <Header
 *   title="Podcaster"
 *   onTitleClick={() => navigate('/')}
 *   rightSlot={<LoadingSpinner ariaLabel="Navigating" />}
 * />
 */
export function Header({
  title = "Podcaster",
  onTitleClick,
  rightSlot,
  className = "",
}: HeaderProps): JSX.Element {
  return (
    <header className={`header ${className}`.trim()}>
      <div className="header__container">
        <button
          type="button"
          className="header__title"
          onClick={onTitleClick}
          aria-label="Ir al inicio"
        >
          {title}
        </button>
        <div className="header__right" aria-live="polite">
          <HeaderLoadingDot />
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
