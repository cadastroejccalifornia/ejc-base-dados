import * as React from "react";
/** Pill search field. Pass a Lucide search glyph as `icon`. */
export interface SearchInputProps {
  placeholder?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function SearchInput(props: SearchInputProps): JSX.Element;
