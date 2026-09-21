import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";
import { Typography } from "../Typography";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 400,
          minHeight: 200,
          background: "var(--fk-bg-stroke)",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    card: {
      control: "text",
      description: "Заголовок секции. Текст или любой ReactNode.",
      table: { type: { summary: "ReactNode" } },
    },
    children: {
      control: "text",
      description: "Содержимое раскрытой секции.",
      table: { type: { summary: "ReactNode" } },
    },
    open: {
      control: "boolean",
      description: "Управляемое состояние раскрытия.",
    },
    defaultOpen: {
      control: "boolean",
      description: "Начальное состояние в неконтролируемом режиме.",
      table: { defaultValue: { summary: "false" } },
    },
    divider: {
      control: "boolean",
      description:
        "Разделяет заголовок и содержимое на две карточки с пунктирным разделителем.",
      table: { defaultValue: { summary: "false" } },
    },
    accordionBackground: {
      control: "color",
      description: "Цвет фона карточек. По умолчанию --fk-bg-primary.",
      table: { type: { summary: "string" } },
    },
    onOpenChange: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    card: "Grid is awesome",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
    divider: false,
    defaultOpen: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithDivider: Story = {
  args: {
    divider: true,
    defaultOpen: true,
  },
};

export const WithTypography: Story = {
  args: {
    defaultOpen: true,
    card: (
      <Typography.Paragraph tag="P3 BOLD">
        Заголовок секции
      </Typography.Paragraph>
    ),
    children: (
      <Typography.Paragraph tag="P4 REGULAR">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Typography.Paragraph>
    ),
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      <Accordion card="Grid is awesome" defaultOpen>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
      <Accordion card="It's full of neat tricks">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
        harum autem delectus mollitia ab assumenda nemo facilis ea aliquam
        deleniti earum recusandae.
      </Accordion>
      <Accordion card="Tell me more" divider defaultOpen>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
    </div>
  ),
};
