import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { ButtonSize, ButtonVariant, IconPosition } from "./button.types";
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
] as const satisfies ButtonVariant[];

const sizeOptions = ["m", "s"] as const satisfies ButtonSize[];

const iconPositionOptions = ["left", "right"] as const satisfies IconPosition[];

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    style: { width: "100%" },
  },
  argTypes: {
    variant: {
      description: `
Controls the visual style and semantic meaning of the button.

- **primary** — Main action, highest emphasis.
- **primary-alternate** — Inverse primary variant (for dark backgrounds).
- **secondary** — Neutral, supporting actions.
- **negative** — Destructive actions (delete, remove, cancel).
- **disable** — Visually disabled, non-interactive state.
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
Controls button size.

- **s** — Compact button with reduced padding.
- **m** — Default button size.
      `,
      control: "select",
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "m" },
      },
    },
    iconPosition: {
      description: `
Controls where the icon is placed relative to the label.

- **left** — Icon appears before the text.
- **right** — Icon appears after the text.
      `,
      control: "select",
      options: iconPositionOptions,
      table: {
        type: { summary: iconPositionOptions.join(" | ") },
        defaultValue: { summary: "left" },
      },
    },
    icon: {
      description: `
Optional icon displayed inside the button.

⚠️ Storybook-only control:
Internally the component expects a React SVG element.
In Storybook this prop is mapped from string options to real icons.
      `,
      control: "select",
      options: [
        "None",
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
        None: undefined,
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
    style: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary",
    variant: "primary",
  },
};

export const PrimaryAlternate: Story = {
  args: {
    label: "Primary Alternate",
    variant: "primary-alternate",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    variant: "secondary",
  },
};

export const Negative: Story = {
  args: {
    label: "Negative",
    variant: "negative",
  },
};

export const Disable: Story = {
  args: {
    label: "Disable",
    variant: "disable",
  },
};
