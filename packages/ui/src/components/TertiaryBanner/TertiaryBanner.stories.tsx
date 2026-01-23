import type { Meta, StoryObj } from "@storybook/react";

import { TertiaryBanner } from "./TertiaryBanner";
import { Appearance } from "./tertiary-banner.types";

const modifierOptions = ["base", "inverted"] as const satisfies Appearance[];

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
    appearance: {
      description: `
Модификатор темы баннера.

- **base** — базовый (светлый) стиль
- **inverted** — инвертированный (тёмный) стиль для тёмных фонов
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
        "Текстовое содержимое баннера (рендерится через Typography.Caption, C1 REGULAR). Рекомендуется использовать короткие и понятные сообщения.",
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
    <TertiaryBanner.Info appearance={args.appearance}>
      {args.children}
    </TertiaryBanner.Info>
  ),
  args: {
    appearance: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Warning: Story = {
  render: (args) => (
    <TertiaryBanner.Warning appearance={args.appearance}>
      {args.children}
    </TertiaryBanner.Warning>
  ),
  args: {
    appearance: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Error: Story = {
  render: (args) => (
    <TertiaryBanner.Error appearance={args.appearance}>
      {args.children}
    </TertiaryBanner.Error>
  ),
  args: {
    appearance: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};

export const Success: Story = {
  render: (args) => (
    <TertiaryBanner.Success appearance={args.appearance}>
      {args.children}
    </TertiaryBanner.Success>
  ),
  args: {
    appearance: "base",
    children: "Какое-то сообщение. Рекомендуемый размер две-три строки.",
  },
};
