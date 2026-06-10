import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Counter } from "./Counter";
import type { CounterAppearance, CounterSize, ICounterProps } from "./counter.types";

type CustomCounterStoryArgs = {
  appearance: "custom";
  color: string;
  value?: number;
};

const sizeOptions = ["xs", "s", "m"] as const satisfies readonly CounterSize[];
const appearanceOptions = ["accent", "custom"] as const satisfies readonly CounterAppearance[];

const meta = {
  title: "Components/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: [...sizeOptions] },
    appearance: { control: "select", options: [...appearanceOptions] },
    value: {
      control: "number",
      if: { arg: "size", neq: "xs" },
    },
    color: {
      control: "color",
      if: { arg: "appearance", eq: "custom" },
    },
  },
  args: {
    size: "m",
    appearance: "accent",
    value: 1,
  },
} satisfies Meta<ICounterProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const props: Record<string, unknown> = { ...args };

    if (props.size === "xs") {
      delete props.value;
    }

    if (props.appearance !== "custom") {
      delete props.color;
    } else if (props.color == null || props.color === "") {
      props.color = "#59C836";
    }

    return <Counter {...(props as ICounterProps)} />;
  },
};

export const AccentCounter: Story = {
  args: {
    value: 1,
  },
  argTypes: {
    appearance: { table: { disable: true } },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    value: { control: "number" },
  },
  render: (args) => {
    const value = "value" in args ? args.value : 1;
    return (
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Counter size="xs" appearance="accent" />
          <Counter size="s" appearance="accent" value={value} />
          <Counter size="m" appearance="accent" value={value} />
        </div>
    );
  },
};

export const CustomCounter: Story = {
  args: {
    appearance: "custom",
    color: "#59C836",
    value: 1,
  } satisfies CustomCounterStoryArgs,
  argTypes: {
    appearance: { table: { disable: true } },
    size: { table: { disable: true } },
    value: { control: "number" },
    color: { control: "color" },
  },
  render: function CustomCounterRender() {
    const [{ color, value = 1 }] = useArgs<CustomCounterStoryArgs>();

    return (
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Counter size="xs" appearance="custom" color={color} />
        <Counter size="s" appearance="custom" color={color} value={value} />
        <Counter size="m" appearance="custom" color={color} value={value} />
      </div>
    );
  },
};

export const Shapes: Story = {
  argTypes: {
    appearance: { table: { disable: true } },
    color: { table: { disable: true } },
    size: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  render: () => (
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Counter size="m" value={8} />
        <Counter size="m" value={12} />
        <Counter size="m" value={100} />
        <Counter size="s" value={99} />
        <Counter size="s" value={100} />
      </div>
  ),
};
