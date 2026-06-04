import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Cell } from "./Cell";
import { ICellProps } from "./cell.types";
import { Avatar } from "../Avatar";
import { Counter } from "../Counter";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import {
  IconChevronRight16Outline,
  IconChevronRight24Outline,
  IconHeart16Outline,
  IconHeart24Outline,
} from "../../assets/icons";

const fillColorOptions = [
  "transparent",
  "var(--bg-primary)",
  "var(--bg-secondary)",
  "var(--light-purple)",
  "var(--normal-purple)",
] as const;

const resolveCellBackground = (backgroundColor?: string) =>
  backgroundColor === "transparent" || backgroundColor == null
    ? undefined
    : backgroundColor;

type CellStoryArgs = ICellProps & {
  separator?: boolean;
  bold?: boolean;
};

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
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    horizontalPadding: {
      control: "select",
      options: [0, 8, 12, 16],
    },
    align: {
      control: "inline-radio",
      options: ["center", "top"],
    },
    backgroundColor: {
      name: "Цвет заливки",
      control: "select",
      options: [...fillColorOptions],
    },
    separator: {
      name: "Сепаратор",
      control: "boolean",
      table: { disable: true },
    },
    bold: {
      name: "Bold",
      control: "boolean",
      table: { disable: true },
    },
  },
  args: {
    align: "center",
    horizontalPadding: 0,
    backgroundColor: "var(--bg-primary)",
  },
} satisfies Meta<CellStoryArgs>;

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

const listCaption = "Описание в три строки максимум";

const rightStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "var(--space-2)",
};

const badgePillStyle: CSSProperties = {
  padding: "2px 8px",
  borderRadius: "var(--radius-8)",
  background: "var(--light-purple)",
  color: "var(--dark-purple)",
};

const listCellProps: ICellProps = {
  backgroundColor: "var(--bg-primary)",
};

const cellStoryProps = ({
  align,
  horizontalPadding,
  backgroundColor,
}: ICellProps): ICellProps => ({
  align,
  horizontalPadding,
  backgroundColor: resolveCellBackground(backgroundColor),
});

export const Default: Story = {
  args: {
    separator: false,
  },
  argTypes: {
    separator: {
      table: { disable: false },
    },
  },
  render: (args) => {
    const { separator = false, ...cellArgs } = args as CellStoryArgs;

    return (
      <Cell {...cellStoryProps(cellArgs)}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator={separator}>
          <Cell.Content.Text>Заголовок</Cell.Content.Text>
          <Cell.Content.Caption>{longCaption}</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => alert("клик")}>
            <Typography.Paragraph tag="P4 REGULAR">Data</Typography.Paragraph>
            <IconChevronRight16Outline aria-hidden="true" />
          </div>
        </Cell.Right>
      </Cell>
    );
  },
};

export const TextOnly: Story = {
  args: {
    separator: false,
    bold: false,
  },
  argTypes: {
    align: { table: { disable: true } },
    separator: {
      table: { disable: false },
    },
    bold: {
      table: { disable: false },
    },
  },
  render: (args) => {
    const { separator = false, bold = false, ...cellArgs } = args as CellStoryArgs;

    return (
      <Cell {...cellStoryProps(cellArgs)}>
        <Cell.Content separator={separator}>
          <Cell.Content.Text bold={bold}>
            Заголовок Text
          </Cell.Content.Text>
        </Cell.Content>
      </Cell>
    );
  },
};

export const CaptionAboveLabel: Story = {
  args: {
    separator: false,
    bold: true,
  },
  argTypes: {
    align: { table: { disable: true } },
    separator: {
      table: { disable: false },
    },
    bold: {
      table: { disable: false },
    },
  },
  render: (args) => {
    const { separator = false, bold = true, ...cellArgs } = args as CellStoryArgs;

    return (
      <Cell {...cellStoryProps({ ...cellArgs, align: "top" })}>
        <Cell.Content separator={separator}>
          <Cell.Content.Caption>Описание сверху</Cell.Content.Caption>
          <Cell.Content.Text bold={bold}>Заголовок снизу</Cell.Content.Text>
        </Cell.Content>
      </Cell>
    );
  },
};

export const WithoutSides: Story = {
  args: {
    horizontalPadding: 0,
    separator: true,
    bold: true,
  },
  argTypes: {
    align: { table: { disable: true } },
    separator: {
      table: { disable: false },
    },
    bold: {
      table: { disable: false },
    },
  },
  render: (args) => {
    const { separator = false, bold = true, ...cellArgs } = args as CellStoryArgs;

    return (
        <Cell {...cellStoryProps({ ...cellArgs, horizontalPadding: 0 })}>
          <Cell.Content separator={separator}>
            <Cell.Content.Text bold={bold}>Только текстовый блок</Cell.Content.Text>
            <Cell.Content.Caption>
              Левый и правый слоты опциональны
            </Cell.Content.Caption>
          </Cell.Content>
        </Cell>
    );
  },
};

export const Alignment: Story = {
  args: {
    align: "center",
    separator: true,
  },
  argTypes: {
    separator: {
      table: { disable: false },
    },
    bold: {
      table: { disable: true },
    },
  },
  render: (args) => {
    const { separator = false, bold: _bold, ...cellArgs } = args as CellStoryArgs;
    const oppositeAlign = cellArgs.align === "top" ? "center" : "top";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Cell {...cellStoryProps(cellArgs)}>
          <Cell.Left>
            <span style={leftIconBgStyle}>
              <IconHeart24Outline />
            </span>
          </Cell.Left>
          <Cell.Content separator={separator}>
            <Cell.Content.Text>Заголовок</Cell.Content.Text>
            <Cell.Content.Caption>Описание</Cell.Content.Caption>
          </Cell.Content>
          <Cell.Right>
            <Typography.Paragraph tag="P3 REGULAR">Data</Typography.Paragraph>
            <IconChevronRight16Outline aria-hidden="true" />
          </Cell.Right>
        </Cell>

        <Cell {...cellStoryProps({ ...cellArgs, align: oppositeAlign })}>
          <Cell.Left>
            <span style={leftIconBgStyle}>
              <IconHeart24Outline />
            </span>
          </Cell.Left>
          <Cell.Content separator={separator}>
            <Cell.Content.Text>Заголовок</Cell.Content.Text>
            <Cell.Content.Caption>{longCaption}</Cell.Content.Caption>
          </Cell.Content>
          <Cell.Right>
            <Typography.Paragraph tag="P4 REGULAR">Data</Typography.Paragraph>
            <IconChevronRight16Outline aria-hidden="true" />
          </Cell.Right>
        </Cell>
      </div>
    );
  },
};

export const WithAvatar: Story = {
  args: {
    separator: true,
    bold: true,
  },
  argTypes: {
    align: { table: { disable: true } },
    separator: {
      table: { disable: false },
    },
    bold: {
      table: { disable: false },
    },
  },
  render: (args) => {
    const { separator = false, bold = true, ...cellArgs } = args as CellStoryArgs;

    return (
      <Cell {...cellStoryProps(cellArgs)}>
        <Cell.Left>
          <Avatar text="Алексей Ветров" size={40} />
        </Cell.Left>
        <Cell.Content separator={separator}>
          <Cell.Content.Text bold={bold}>Алексей Ветров</Cell.Content.Text>
          <Cell.Content.Caption>Онлайн</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <IconChevronRight16Outline aria-hidden="true" />
        </Cell.Right>
      </Cell>
    );
  },
};

export const List: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div>
      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator>
          <Cell.Content.Text>Заголовок</Cell.Content.Text>
          <Cell.Content.Caption>{listCaption}</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <div style={{display: "flex", alignItems: 'center', color: "var(--icon-tertiary)"}}>
            <Counter size="m" value={100} />
            <IconChevronRight24Outline style={{ cursor: "pointer" }} onClick={() => alert("клик")} />
          </div>
        </Cell.Right>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator>
          <Cell.Content.Text>Заголовок</Cell.Content.Text>
          <Cell.Content.Caption>{listCaption}</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <div style={{display: "flex", alignItems: 'center', columnGap: "12px"}}>
            <IconButton
              size="s"
              variant="secondary"
              icon={<IconHeart24Outline />}
              ariaLabel="Добавить в избранное"
            />
            <IconButton
              size="s"
              variant="secondary"
              icon={<IconHeart24Outline />}
              ariaLabel="Добавить в избранное"
            />
          </div>
        </Cell.Right>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator>
          <Cell.Content.Text>Заголовок</Cell.Content.Text>
          <Cell.Content.Caption>{listCaption}</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <IconButton
            size="s"
            variant="secondary"
            icon={<IconHeart24Outline />}
            ariaLabel="Добавить в избранное"
          />
        </Cell.Right>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content>
          <Cell.Content.Text>Заголовок</Cell.Content.Text>
          <Cell.Content.Caption>{listCaption}</Cell.Content.Caption>
        </Cell.Content>
        <Cell.Right>
          <Typography.Paragraph style={{color: "var(--text-secondary)"}} tag="P4 REGULAR">Data</Typography.Paragraph>
        </Cell.Right>
      </Cell>
    </div>
  ),
};
