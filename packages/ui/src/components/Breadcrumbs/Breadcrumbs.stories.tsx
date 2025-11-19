import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "./Breadcrumbs";
import type { IBreadcrumbItem } from "./breadcrumbs.types";
import { IconLineArrowRight16Outline } from "../../assets/icons";

const defaultItems: IBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Frontend Conf 2025", href: "/events/frontend-conf-2025" },
  { label: "Tickets", href: "/events/frontend-conf-2025/tickets" },
];

const longItems: IBreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Online", href: "/events/online" },
  { label: "Conferences", href: "/events/online/conferences" },
  { label: "Frontend Conf 2025", href: "/events/frontend-conf-2025" },
  { label: "Tickets", href: "/events/frontend-conf-2025/tickets" },
];

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "backstep"],
      description: `
### Breadcrumbs Mode

Controls how the component behaves and renders.

#### **default**
- Standard hierarchical breadcrumb trail  
- Renders all items separated by **separator**  
- All items except the last are clickable links  
- Last item becomes the **current page** (non-clickable, bold)

#### **backstep**
- Single-level “go back” pattern  
- Intended for pages without a visible breadcrumb hierarchy  
- Uses only the **first item** from \`items\`  
- Renders a **button** with a left arrow icon and label  
- Performs an action via \`onClick\` instead of navigation
      `,
      table: {
        type: { summary: `"default" | "backstep"` },
        defaultValue: { summary: "default" },
      },
    },
    separator: {
      control: "text",
      description:
        "Separator displayed between breadcrumb items in `default` mode.",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    items: {
      control: false,
      description: "Breadcrumb items array. Configured per story.",
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic breadcrumb trail with 4 items.
 * Last item is treated as the current page.
 */
export const Basic: Story = {
  args: {
    type: "default",
    items: defaultItems,
    separator: <IconLineArrowRight16Outline />,
  },
};

/**
 * Longer breadcrumb trail example with more levels.
 */
export const LongTrail: Story = {
  args: {
    type: "default",
    items: longItems,
    separator: <IconLineArrowRight16Outline />,
  },
};

/**
 * Backstep mode: renders a single back button with a left arrow.
 * Uses only the first item from \`items\`.
 */
export const Backstep: Story = {
  args: {
    type: "backstep",
    items: [
      {
        label: "Back to events",
        onClick: () => {
          console.log("[Breadcrumbs] Backstep clicked");
        },
      },
    ],
  },
};
