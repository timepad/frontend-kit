import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Pagination } from "./Pagination";
import {
  IPaginationProps,
  IPaginationStepProps,
  PaginationSize,
} from "./pagination.types";

const sizeOptions = ["s", "m"] as const satisfies readonly PaginationSize[];

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  subcomponents: {
    "Pagination.Prev": Pagination.Prev,
    "Pagination.Next": Pagination.Next,
    "Pagination.Pages": Pagination.Pages,
  },
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  args: {
    page: 1,
    pageCount: 12,
    siblingCount: 1,
    size: "s",
    disabled: false,
    onPageChange: (_page: number) => {},
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 0 } },
    siblingCount: { control: { type: "number", min: 0 } },
    size: { control: "select", options: [...sizeOptions] },
    onPageChange: { action: "onPageChange" },
  },
} satisfies Meta<IPaginationProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const [, updateArgs] = useArgs();

    return (
      <Pagination
        {...args}
        onPageChange={(nextPage) => {
          updateArgs({ page: nextPage });
          args.onPageChange(nextPage);
        }}
      >
        <Pagination.Prev />
        <Pagination.Pages />
        <Pagination.Next />
      </Pagination>
    );
  },
};

export const Range: Story = {
  argTypes: {
    page: { table: { disable: true } },
    pageCount: { table: { disable: true } },
    siblingCount: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <Pagination page={1} pageCount={12} onPageChange={() => {}} />
      <Pagination page={6} pageCount={12} onPageChange={() => {}} />
      <Pagination page={12} pageCount={12} onPageChange={() => {}} />
      <Pagination page={3} pageCount={5} onPageChange={() => {}} />
    </div>
  ),
};

export const Sizes: Story = {
  argTypes: {
    page: { table: { disable: true } },
    pageCount: { table: { disable: true } },
    siblingCount: { table: { disable: true } },
    size: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <Pagination size="s" page={3} pageCount={12} onPageChange={() => {}} />
      <Pagination size="m" page={3} pageCount={12} onPageChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    page: 4,
    pageCount: 12,
    disabled: true,
  },
};

export const Controls: Story = {
  argTypes: {
    page: { table: { disable: true } },
    pageCount: { table: { disable: true } },
    siblingCount: { table: { disable: true } },
    disabled: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <PaginationExample />
      <PaginationExample prev={{ label: "Назад" }} next={{ label: "Вперёд" }} />
      <PaginationExample
        prev={{ label: "Назад", icon: true }}
        next={{ label: "Вперёд", icon: true }}
      />
    </div>
  ),
};

const PaginationExample = ({
  prev,
  next,
}: {
  prev?: IPaginationStepProps;
  next?: IPaginationStepProps;
}) => {
  const [page, setPage] = useState(3);

  return (
    <Pagination page={page} pageCount={12} onPageChange={setPage}>
      <Pagination.Prev {...prev} />
      <Pagination.Pages />
      <Pagination.Next {...next} />
    </Pagination>
  );
};
