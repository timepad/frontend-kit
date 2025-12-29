import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { IconButtonSize, IconButtonVariant } from "./icon-button.types";
import {
  IconCross16Outline,
  IconCross24Outline,
  IconCross32Outline,
  IconLock16Fill,
  IconLock24Fill,
  IconLock32Fill,
  IconLock16Outline,
  IconLock24Outline,
  IconLock32Outline,
} from "../../assets/icons";

const variantOptions = [
  "primary",
  "primary-alternate",
  "secondary",
  "negative",
  "disable",
  "transparent",
] as const satisfies IconButtonVariant[];

const sizeOptions = ["xs", "m", "s"] as const satisfies IconButtonSize[];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
    icon: {
      control: "select",
      options: [
        "Cross16Outline",
        "Cross24Outline",
        "Cross32Outline",
        "Lock16Fill",
        "Lock24Fill",
        "Lock32Fill",
        "Lock16Outline",
        "Lock24Outline",
        "Lock32Outline",
        "None",
      ],
      mapping: {
        Cross16Outline: <IconCross16Outline />,
        Cross24Outline: <IconCross24Outline />,
        Cross32Outline: <IconCross32Outline />,
        Lock16Fill: <IconLock16Fill />,
        Lock24Fill: <IconLock24Fill />,
        Lock32Fill: <IconLock32Fill />,
        Lock16Outline: <IconLock16Outline />,
        Lock24Outline: <IconLock24Outline />,
        Lock32Outline: <IconLock32Outline />,
        None: undefined,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <IconCross16Outline />,
  },
};

export const PrimaryAlternate: Story = {
  args: {
    variant: "primary-alternate",
    icon: <IconCross16Outline />,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <IconCross16Outline />,
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
    icon: <IconCross16Outline />,
  },
};

export const Disable: Story = {
  args: {
    variant: "disable",
    icon: <IconCross16Outline />,
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    icon: <IconCross16Outline />,
  },
};
