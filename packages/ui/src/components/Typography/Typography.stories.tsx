import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["lead", "header", "paragraph", "caption"],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lead1: Story = {
  args: {
    children: "Typography",
    variant: "lead",
    size: 1,
    fontType: "accent",
    fontWeight: "bold",
    as: "h1",
  },
};
export const Lead2: Story = {
  args: {
    children: "Typography",
    variant: "lead",
    size: 2,
    fontType: "accent",
    fontWeight: "bold",
  },
};
export const Lead3: Story = {
  args: {
    children: "Typography",
    variant: "lead",
    size: 3,
    fontType: "accent",
    fontWeight: "bold",
  },
};

export const HeaderAccent1: Story = {
  args: {
    children: "Typography",
    variant: "header",
    size: 1,
    fontType: "accent",
    fontWeight: "bold",
  },
};

export const Header1: Story = {
  args: {
    children: "Typography",
    variant: "header",
    size: 1,
    fontWeight: "bold",
    fontType: "regular",
  },
};

export const Paragraph1: Story = {
  args: {
    children: "Typography",
    variant: "paragraph",
    size: 1,
    fontType: "regular",
  },
};
export const Paragraph2: Story = {
  args: {
    children: "Typography",
    variant: "paragraph",
    size: 2,
    fontType: "regular",
  },
};
export const Paragraph3: Story = {
  args: {
    children: "Typography",
    variant: "paragraph",
    size: 3,
    fontType: "regular",
    uppercase: true,
    fontWeight: "bold",
  },
};
export const Paragraph4: Story = {
  args: {
    children: "Typography",
    variant: "paragraph",
    size: 4,
    fontType: "regular",
  },
};

export const Caption1: Story = {
  args: {
    children: "Typography",
    variant: "caption",
    size: 1,
    fontType: "regular",
  },
};
