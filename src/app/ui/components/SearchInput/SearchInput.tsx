// src/app/ui/components/SearchInput/SearchInput.tsx

import "./SearchInput.css";
import type { SearchInputProps } from "./types";
import { JSX, useId } from "react";

/**
 * Accessible, controlled search field with a hidden label and native styling.
 *
 * - Emits string values via `onChange` for filtering lists in real time.
 * - Uses semantic `type="search"` for better UX on some platforms.
 *
 * @param {SearchInputProps} props - Controlled value, change handler, and accessibility labels.
 * @returns {JSX.Element} Search input field.
 *
 * @example
 * const [query, setQuery] = useState('');
 * <SearchInput value={query} onChange={setQuery} placeholder="Search by title or author" />
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Filter podcasts…",
  label = "Filter",
  name = "search",
  className = "",
  autoFocus = false,
}: SearchInputProps): JSX.Element {
  const id = useId();
  return (
    <div className={`search ${className}`.trim()}>
      <label htmlFor={id} className="search__label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="search"
        className="search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />
    </div>
  );
}
