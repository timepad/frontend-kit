import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react";

export interface IBreadcrumbItem {
  /** Content to render (text, icon+text, Typography, etc.) */
  label: ReactNode;
  /** URL for navigation. */
  href?: string;
  /** Explicitly mark this item as the current page.
   * When not set, the last item is treated as current if there is more than one item.
   */
  isCurrent?: boolean;
  onClick?: (event: SyntheticEvent) => void;
}

export interface IBreadcrumbsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** Ordered list of breadcrumb items. */
  items: IBreadcrumbItem[];
  /** Custom separator between items. */
  separator?: React.ReactNode;
  /**
   * Defines the visual and behavioral mode of the Breadcrumbs component.
   *
   * - **default** — Standard hierarchical breadcrumbs:
   *   - Renders a list of items separated by for example"›".
   *   - Intermediate items are links.
   *   - The last item is marked as the current page by default.
   *
   * - **backstep** — Single-level "go back" pattern:
   *   - Renders only the first item as a back button with a left arrow.
   *   - Used when a page has no visible breadcrumb hierarchy, but still needs an
   *     affordance to return to the previous screen or parent section.
   */
  type?: "default" | "backstep";
}
