import type { Meta, StoryObj } from "@storybook/react";

import { TertiaryBanner } from "./TertiaryBanner";
import { Modifier } from "./tertiary-banner.types";

const modifierOptions = ["base", "inverted"] as const satisfies Modifier[];

const meta = {
  title: "Components/TertiaryBanner",
  component: TertiaryBanner,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    modifier: {
      description: `
Theme modifier of the banner.

- **base** — default (light) style
- **inverted** — inverted (dark) style for dark backgrounds
      `,
      control: "select",
      options: modifierOptions,
      table: {
        type: { summary: `"base" | "inverted"` },
        defaultValue: { summary: "base" },
      },
    },
    children: {
      description:
        "Text content of the banner (rendered as Typography.Caption, C1 REGULAR). Keep it short and clear.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    variant: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof TertiaryBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: (args) => (
    <TertiaryBanner.Info modifier={args.modifier}>
      {args.children}
    </TertiaryBanner.Info>
  ),
  args: {
    modifier: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Warning: Story = {
  render: (args) => (
    <TertiaryBanner.Warning modifier={args.modifier}>
      {args.children}
    </TertiaryBanner.Warning>
  ),
  args: {
    modifier: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Error: Story = {
  render: (args) => (
    <TertiaryBanner.Error modifier={args.modifier}>
      {args.children}
    </TertiaryBanner.Error>
  ),
  args: {
    modifier: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Success: Story = {
  render: (args) => (
    <TertiaryBanner.Success modifier={args.modifier}>
      {args.children}
    </TertiaryBanner.Success>
  ),
  args: {
    modifier: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};
