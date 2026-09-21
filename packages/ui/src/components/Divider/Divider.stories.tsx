import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";
import type { DividerFlow, DividerVariant, IDividerProps } from "./divider.types";

const flowOptions = ["horizontal", "vertical"] as const satisfies readonly DividerFlow[];
const variantOptions = ["solid", "dashed"] as const satisfies readonly DividerVariant[];

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    flow: { control: "select", options: [...flowOptions] },
    variant: { control: "select", options: [...variantOptions] },
  },
  args: {
    flow: "horizontal",
    variant: "solid",
  },
} satisfies Meta<IDividerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ flow, variant }) => {
    if (flow === "vertical") {
      return (
        <div style={{ display: "flex", height: 600, width: 200 }}>
          <Divider flow="vertical" variant={variant} />
        </div>
      );
    }

    return (
      <div style={{ width: 600 }}>
        <Divider flow="horizontal" variant={variant} />
      </div>
    );
  },
};

export const Horizontal: Story = {
  argTypes: {
    flow: { table: { disable: true } },
  },
  render: () => (
    <div style={{ width: 600 }}>
      <Divider flow="horizontal" />
    </div>
  ),
};

export const Vertical: Story = {
  argTypes: {
    flow: { table: { disable: true } },
  },
  render: () => (
    <div style={{ display: "flex", height: 600, width: 200 }}>
      <Divider flow="vertical" />
    </div>
  ),
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
  render: ({ flow, variant }) => {
    if (flow === "vertical") {
      return (
        <div style={{ display: "flex", height: 600, width: 200 }}>
          <Divider flow="vertical" variant={variant} />
        </div>
      );
    }

    return (
      <div style={{ width: 600 }}>
        <Divider flow="horizontal" variant={variant} />
      </div>
    );
  },
};
