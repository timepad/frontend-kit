import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { ButtonSize, ButtonVariant, IconPosition } from "./button.types";
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
] as const satisfies ButtonVariant[];

const sizeOptions = ["M", "S"] as const satisfies ButtonSize[];

const iconPositionOptions = ["left", "right"] as const satisfies IconPosition[];

const meta = {
  title: "Components/Button",
  component: Button,
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
    iconPosition: {
      control: "select",
      options: iconPositionOptions,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary",
    variant: "primary",
  },
};

export const PrimaryAlternate: Story = {
  args: {
    label: "Primary Alternate",
    variant: "primary-alternate",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    variant: "secondary",
  },
};

export const Negative: Story = {
  args: {
    label: "Negative",
    variant: "negative",
  },
};

export const Disable: Story = {
  args: {
    label: "Disable",
    variant: "disable",
  },
};
