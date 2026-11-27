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

const renderInteractive: Story["render"] = function Render(args) {
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
};

export const Playground: Story = {
  render: renderInteractive,
};

export const Range: Story = {
  argTypes: {
    page: { table: { disable: true } },
    pageCount: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      <Pagination {...args} page={1} pageCount={12} onPageChange={() => {}} />
      <Pagination {...args} page={6} pageCount={12} onPageChange={() => {}} />
      <Pagination {...args} page={12} pageCount={12} onPageChange={() => {}} />
      <Pagination {...args} page={3} pageCount={5} onPageChange={() => {}} />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    page: 3,
  },
  argTypes: {
    size: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ display: "grid", gap: 24 }}>
      <Pagination {...args} size="s" onPageChange={() => {}} />
      <Pagination {...args} size="m" onPageChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    page: 4,
    pageCount: 12,
    disabled: true,
  },
  render: renderInteractive,
};

export const Controls: Story = {
  argTypes: {
    page: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
  render: (args) => (
    <div style={{ display: "grid", gap: 24 }}>
      <PaginationExample {...args} />
      <PaginationExample
        {...args}
        prev={{ label: "Назад" }}
        next={{ label: "Вперёд" }}
      />
      <PaginationExample
        {...args}
        prev={{ label: "Назад", icon: true }}
        next={{ label: "Вперёд", icon: true }}
      />
    </div>
  ),
};

const PaginationExample = ({
  prev,
  next,
  pageCount,
  siblingCount,
  size,
  disabled,
}: {
  prev?: IPaginationStepProps;
  next?: IPaginationStepProps;
} & Pick<
  IPaginationProps,
  "pageCount" | "siblingCount" | "size" | "disabled"
>) => {
  const [page, setPage] = useState(3);

  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      siblingCount={siblingCount}
      size={size}
      disabled={disabled}
      onPageChange={setPage}
    >
      <Pagination.Prev {...prev} />
      <Pagination.Pages />
      <Pagination.Next {...next} />
    </Pagination>
  );
};
