// src/app/ui/components/SearchInput/types.ts

/**
 * Props for the SearchInput component.
 *
 * @property {string} value - Controlled value for the search field.
 * @property {(value: string) => void} onChange - Change handler receiving the new string value.
 * @property {string} [placeholder='Filter podcasts…'] - Input placeholder text.
 * @property {string} [label='Filter'] - Visually-hidden accessible label for screen readers.
 * @property {string} [name='search'] - Input name attribute.
 * @property {string} [className] - Additional CSS class names to append.
 * @property {boolean} [autoFocus=false] - Autofocus the input on mount.
 */
export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  className?: string;
  autoFocus?: boolean;
};
