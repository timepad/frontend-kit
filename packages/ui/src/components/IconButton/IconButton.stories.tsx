import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { IconButtonSize, IconButtonVariant } from "./icon-button.types";
import {
  IconCross16Outline,
  IconCross24Outline,
  IconCross32Outline,
  IconLock16Fill,
  IconLock24Fill,
  IconLock32Fill,
  IconLock16Outline,
  IconLock24Outline,
  IconLock32Outline,
} from "../../assets/icons";

const variantOptions = [
  "primary",
  "primary-alternate",
  "secondary",
  "negative",
  "disable",
  "transparent",
] as const satisfies IconButtonVariant[];

const sizeOptions = ["xs", "s", "m"] as const satisfies IconButtonSize[];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: `
Controls the visual style and semantic meaning of the IconButton.

- **primary** — Main action, high emphasis.
- **primary-alternate** — Inverse primary variant (for dark backgrounds).
- **secondary** — Neutral, lower emphasis.
- **negative** — Destructive actions (delete, remove, cancel).
- **disable** — Visually disabled, non-interactive state.
- **transparent** — Minimal background-less button for subtle inline actions; visually integrated with surrounding content.
      `,
      control: "select",
      options: variantOptions,
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: `
Controls the size of the IconButton.

- **xs** — Ultra-compact button for dense UI (toolbars, inline chrome, tight layouts).
- **s** — Compact button.
- **m** — Default button size.
      `,
      control: "select",
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "m" },
      },
    },
    icon: {
      description: `
Icon element rendered inside the button.

⚠️ Storybook-only control:
Internally the component expects a React SVG element.
In Storybook this prop is mapped from string options to real icons.
      `,
      control: "select",
      options: [
        "Cross16Outline",
        "Cross24Outline",
        "Cross32Outline",
        "Lock16Fill",
        "Lock24Fill",
        "Lock32Fill",
        "Lock16Outline",
        "Lock24Outline",
        "Lock32Outline",
      ],
      mapping: {
        Cross16Outline: <IconCross16Outline />,
        Cross24Outline: <IconCross24Outline />,
        Cross32Outline: <IconCross32Outline />,
        Lock16Fill: <IconLock16Fill />,
        Lock24Fill: <IconLock24Fill />,
        Lock32Fill: <IconLock32Fill />,
        Lock16Outline: <IconLock16Outline />,
        Lock24Outline: <IconLock24Outline />,
        Lock32Outline: <IconLock32Outline />,
      },
      table: {
        type: { summary: "ReactElement<SVG>" },
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn"
  },
};

export const PrimaryAlternate: Story = {
  args: {
    variant: "primary-alternate",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn"
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn"
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn"
  },
};

export const Disable: Story = {
  args: {
    variant: "disable",
    icon: <IconCross16Outline />,
    ariaLabel: "Close btn"
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    icon: <IconCross16Outline />,
    ariaLabelledby: "Close btn"
  },
};
