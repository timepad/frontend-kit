import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import type { Appearance, BadgeSize, BadgeVariant, IconPosition } from "./badge.types";
import {
  IconCross16Outline,
  IconLock16Fill,
  IconLock16Outline,
} from "../../assets/icons";

const sizeOptions = ["s", "m", "l"] as const satisfies BadgeSize[];

const variantOptions = [
  "primary",
  "secondary",
  "outline",
] as const satisfies BadgeVariant[];

const appearanceOptions = [
  "accent",
  "positive",
  "negative",
] as const satisfies Appearance[];

const iconPositionOptions = ["left", "right"] as const satisfies IconPosition[];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 340, display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Содержимое бейджа.",
      table: { type: { summary: "ReactNode" } },
    },
    size: {
      description: `
Размер бейджа.

- **s** — компактный размер.
- **m** — стандартный размер.
- **l** — увеличенный размер.
      `,
      control: "select",
      options: sizeOptions,
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "m" },
      },
    },
    variant: {
      description: `
Вариант (дизайн-пресет) бейджа.

- **primary**
- **secondary**
- **outline**
      `,
      control: "select",
      options: variantOptions,
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    appearance: {
      description: `
Семантическое состояние бейджа.

- **accent**
- **positive**
- **negative**
      `,
      control: "select",
      options: appearanceOptions,
      table: {
        type: { summary: appearanceOptions.join(" | ") },
        defaultValue: { summary: "accent" },
      },
    },
    iconPosition: {
      description: `
Позиция иконки относительно текста.

- **left** — иконка перед текстом
- **right** — иконка после текста
      `,
      control: "select",
      options: iconPositionOptions,
      if: { arg: "size", neq: "s" },
      table: {
        type: { summary: iconPositionOptions.join(" | ") },
        defaultValue: { summary: "left" },
      },
    },
    icon: {
      description: `
Необязательная иконка в бейдже.

⚠️ Контрол только для Storybook:
компонент ожидает React-элемент SVG.
      `,
      control: "select",
      if: { arg: "size", neq: "s" },
      options: ["None", "Cross16Outline", "Lock16Fill", "Lock16Outline"],
      mapping: {
        None: undefined,
        Cross16Outline: <IconCross16Outline />,
        Lock16Fill: <IconLock16Fill />,
        Lock16Outline: <IconLock16Outline />,
      },
      table: {
        type: { summary: "ReactElement<SVG>" },
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: "Badge",
    size: "m",
    variant: "primary",
    appearance: "accent",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Positive: Story = {
  args: {
    label: "Positive",
    appearance: "positive",
  },
};

export const Negative: Story = {
  args: {
    label: "Negative",
    appearance: "negative",
  },
};
