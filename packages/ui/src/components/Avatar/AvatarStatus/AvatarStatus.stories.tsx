import type { Meta, StoryObj } from "@storybook/react";

import { AvatarStatus } from "./AvatarStatus";

const meta = {
  title: "Components/AvatarStatus",
  component: AvatarStatus,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["s", "m", "l"],
    },
    appearance: {
      control: "select",
      options: ["accent", "custom"],
    },
    as: {
      control: "select",
      options: ["span", "button"],
    },
  },
} satisfies Meta<typeof AvatarStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: {
    size: "m",
    appearance: "accent",
  },
};

export const Custom: Story = {
  args: {
    size: "m",
    appearance: "custom",
  },
};

export const CustomWithColor: Story = {
  args: {
    size: "m",
    appearance: "custom",
    color: "var(--accent-positive)",
  },
};

export const AsButton: Story = {
  args: {
    as: "button",
    size: "l",
    "aria-label": "Change status",
  },
};
