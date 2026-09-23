import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";
import { Typography } from "../Typography";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: undefined },
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
      description:
        "Заголовок секции внутри <button>. Для Typography укажите as=\"span\".",
      table: { type: { summary: "ReactNode" } },
    },
    children: {
      control: "text",
      description: "Содержимое раскрытой секции.",
      table: { type: { summary: "ReactNode" } },
    },
    open: {
      control: "boolean",
      description:
        "Начальное состояние раскрытия. С `onOpenChange` становится управляемым.",
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
    onOpenChange: { table: { disable: true }, control: false, action: false },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    card: "Grid is awesome",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
    divider: false,
    open: false,
    onOpenChange: undefined,
  },
  render: ({ onOpenChange: _onOpenChange, ...args }) => <Accordion {...args} />,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const WithDivider: Story = {
  args: {
    divider: true,
    open: true,
  },
};

export const WithTypography: Story = {
  args: {
    open: true,
    card: (
      <Typography.Paragraph tag="P3 BOLD" as="span">
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
      <Accordion card="Grid is awesome" open>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
      <Accordion card="It's full of neat tricks">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
        harum autem delectus mollitia ab assumenda nemo facilis ea aliquam
        deleniti earum recusandae.
      </Accordion>
      <Accordion card="Tell me more" divider open>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
    </div>
  ),
};
