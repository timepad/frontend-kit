import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Cell } from "./Cell";
import { ICellProps } from "./cell.types";
import { Avatar } from "../Avatar";
import { Typography } from "../Typography";
import {
  IconChevronRight16Outline,
  IconHeart24Outline,
} from "../../assets/icons";

const meta = {
  title: "Components/Cell",
  component: Cell,
  parameters: {
    layout: "padded",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480, background: "var(--bg-secondary)" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    horizontalPadding: {
      control: "select",
      options: [0, 8, 16],
    },
    align: {
      control: "inline-radio",
      options: ["center", "top"],
    },
  },
  args: {
    align: "center",
    horizontalPadding: 0,
  },
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

const leftIconBgStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: "var(--radius-8)",
  background: "var(--bg-secondary)",
};

const longCaption =
  "И большое описание, которое ещё сильнее увеличивает высоту контейнера. Третья строка caption.";

const cellStoryProps = ({
  align,
  horizontalPadding,
}: ICellProps): ICellProps => ({
  align,
  horizontalPadding,
});

export const Default: Story = {
  render: (args) => (
    <Cell {...cellStoryProps(args)}>
      <Cell.Left>
        <span style={leftIconBgStyle}>
          <IconHeart24Outline />
        </span>
      </Cell.Left>
      <Cell.Content separator>
        <Cell.Text>Заголовок</Cell.Text>
        <Cell.Caption>{longCaption}</Cell.Caption>
      </Cell.Content>
      <Cell.Right>
        <Typography.Paragraph tag="P4 REGULAR">Data</Typography.Paragraph>
        <IconChevronRight16Outline aria-hidden="true" />
      </Cell.Right>
    </Cell>
  ),
};

export const TextOnly: Story = {
  render: () => (
    <Cell>
      <Cell.Content>
        <Cell.Text bold={false}>
          Заголовок regular
        </Cell.Text>
      </Cell.Content>
    </Cell>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Cell>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content>
          <Cell.Text>Заголовок</Cell.Text>
          <Cell.Caption>Описание</Cell.Caption>
        </Cell.Content>
        <Cell.Right>
          <Typography.Paragraph tag="P3 REGULAR">Data</Typography.Paragraph>
          <IconChevronRight16Outline aria-hidden="true" />
        </Cell.Right>
      </Cell>

      <Cell align="top">
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content>
          <Cell.Text>Заголовок</Cell.Text>
          <Cell.Caption>{longCaption}</Cell.Caption>
        </Cell.Content>
        <Cell.Right>
          <Typography.Paragraph tag="P4 REGULAR">Data</Typography.Paragraph>
          <IconChevronRight16Outline aria-hidden="true" />
        </Cell.Right>
      </Cell>
    </div>
  ),
};

export const CaptionAboveLabel: Story = {
  render: () => (
    <Cell align="top">
      <Cell.Content>
        <Cell.Caption>Описание сверху</Cell.Caption>
        <Cell.Text>Заголовок снизу</Cell.Text>
      </Cell.Content>
    </Cell>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <Cell>
      <Cell.Left>
        <Avatar text="Алексей Ветров" size={40} />
      </Cell.Left>
      <Cell.Content separator>
        <Cell.Text>Алексей Ветров</Cell.Text>
        <Cell.Caption>Онлайн</Cell.Caption>
      </Cell.Content>
      <Cell.Right>
        <IconChevronRight16Outline aria-hidden="true" />
      </Cell.Right>
    </Cell>
  ),
};

export const WithoutSides: Story = {
  render: () => (
    <Cell horizontalPadding={0}>
      <Cell.Content separator>
        <Cell.Text>Только текстовый блок</Cell.Text>
        <Cell.Caption>Левый и правый слоты опциональны</Cell.Caption>
      </Cell.Content>
    </Cell>
  ),
};

export const List: Story = {
  render: () => (
    <div>
      <Cell>
        <Cell.Content separator>
          <Cell.Text>Первая ячейка</Cell.Text>
        </Cell.Content>
      </Cell>
      <Cell>
        <Cell.Content separator>
          <Cell.Text>Вторая ячейка</Cell.Text>
        </Cell.Content>
      </Cell>
      <Cell>
        <Cell.Content>
          <Cell.Text>Третья ячейка без сепаратора</Cell.Text>
        </Cell.Content>
      </Cell>
    </div>
  ),
};
