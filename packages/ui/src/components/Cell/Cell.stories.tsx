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

const longCaption = "Описание в три строки максимум, а остально будет обрезаться троеточием барабарабарабара береберебере барабарабарабара береберебере барабарабарабара береберебере места ещё много очень, очень много места";
const listCaption = "Описание в три строки максимум";

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
          <Cell.Content.Text>
            <Cell.Content.Text.Label>
              Заголовок в три строки максимум, остальное обрезается тремя точками в конце. Заголовок в три строки максимум, остальное обрезается тремя точками в конце
            </Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>{longCaption}</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => alert("клик")}>
              <Typography.Paragraph tag="P4 REGULAR">Data</Typography.Paragraph>
              <IconChevronRight16Outline aria-hidden="true" />
            </div>
          </Cell.Content.Right>
        </Cell.Content>
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
          <Cell.Content.Text>
            <Cell.Content.Text.Label bold={bold}>
              Заголовок Text
            </Cell.Content.Text.Label>
          </Cell.Content.Text>
        </Cell.Content>
      </Cell>
    );
  },
};

export const CaptionAboveText: Story = {
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
          <Cell.Content.Text>
            <Cell.Content.Text.Caption>Описание сверху</Cell.Content.Text.Caption>
            <Cell.Content.Text.Label bold={bold}>Заголовок снизу</Cell.Content.Text.Label>
          </Cell.Content.Text>
        </Cell.Content>
      </Cell>
    );
  },
};

export const TextAboveCaption: Story = {
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
            <Cell.Content.Text>
              <Cell.Content.Text.Label bold={bold}>Только текстовый блок</Cell.Content.Text.Label>
              <Cell.Content.Text.Caption>
                Левый и правый слоты опциональны
              </Cell.Content.Text.Caption>
            </Cell.Content.Text>
          </Cell.Content>
        </Cell>
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
          <Cell.Content.Text>
            <Cell.Content.Text.Label bold={bold}>Алексей Ветров</Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>Онлайн</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
            <IconChevronRight16Outline aria-hidden="true" />
          </Cell.Content.Right>
        </Cell.Content>
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
          <Cell.Content.Text>
            <Cell.Content.Text.Label>Заголовок</Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>{listCaption}</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
            <div style={{display: "flex", alignItems: 'center', color: "var(--icon-tertiary)"}}>
              <Counter size="m" value={100} />
              <IconChevronRight24Outline style={{ cursor: "pointer" }} onClick={() => alert("клик")} />
            </div>
          </Cell.Content.Right>
        </Cell.Content>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator>
          <Cell.Content.Text>
            <Cell.Content.Text.Label>Заголовок</Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>{listCaption}</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
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
          </Cell.Content.Right>
        </Cell.Content>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content separator>
          <Cell.Content.Text>
            <Cell.Content.Text.Label>Заголовок</Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>{listCaption}</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
            <IconButton
              size="s"
              variant="secondary"
              icon={<IconHeart24Outline />}
              ariaLabel="Добавить в избранное"
            />
          </Cell.Content.Right>
        </Cell.Content>
      </Cell>

      <Cell {...listCellProps}>
        <Cell.Left>
          <span style={leftIconBgStyle}>
            <IconHeart24Outline />
          </span>
        </Cell.Left>
        <Cell.Content>
          <Cell.Content.Text>
            <Cell.Content.Text.Label>Заголовок</Cell.Content.Text.Label>
            <Cell.Content.Text.Caption>{listCaption}</Cell.Content.Text.Caption>
          </Cell.Content.Text>
          <Cell.Content.Right>
            <Typography.Paragraph style={{color: "var(--text-secondary)"}} tag="P4 REGULAR">Data</Typography.Paragraph>
          </Cell.Content.Right>
        </Cell.Content>
      </Cell>
    </div>
  ),
};
