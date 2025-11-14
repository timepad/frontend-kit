import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";
import {
  CaptionSize,
  FontType,
  FontWeight,
  HeaderSize,
  LeadSize,
  ParagraphSize,
} from "./typography.types";

const variantOptions = ["lead", "header", "paragraph", "caption"] as const;

const fontWeightOptions = [
  "bold",
  "semi-bold",
  "medium",
  "regular",
] as const satisfies FontWeight[];

const fontTypeOptions = ["accent", "regular"] as const satisfies FontType[];

const sizeOptions = [1, 2, 3, 4] as const satisfies (
  | LeadSize
  | HeaderSize
  | ParagraphSize
  | CaptionSize
)[];

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
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
      description:
        "Size depends on variant: lead(1–3), header(1–4), paragraph(1–4), caption(1).",
    },
    fontWeight: {
      control: "select",
      options: fontWeightOptions,
    },
    fontType: {
      control: "select",
      options: fontTypeOptions,
    },
    uppercase: {
      control: "boolean",
    },
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "h4"],
    },
    innerRef: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

const leadSizeOptions = [1, 2, 3] as const satisfies LeadSize[];

export const Lead: Story = {
  args: {
    children: "Lead text",
    variant: "lead",
    size: 1,
    fontWeight: "medium",
    fontType: "accent",
    uppercase: false,
    as: "p",
  },
  argTypes: {
    size: {
      control: "select",
      options: leadSizeOptions,
    },
    variant: {
      table: { disable: true },
    },
  },
};

const headerSizeOptions = [1, 2, 3, 4] as const satisfies HeaderSize[];
export const Header: Story = {
  args: {
    children: "Header text",
    variant: "header",
    size: 2,
    fontWeight: "bold",
    fontType: "regular",
    uppercase: false,
    as: "h2",
  },
  argTypes: {
    size: {
      control: "select",
      options: headerSizeOptions,
    },
    variant: {
      table: { disable: true },
    },
  },
};

const paragraphSizeOptions = [1, 2, 3, 4] as const satisfies ParagraphSize[];
export const Paragraph: Story = {
  args: {
    children: "Paragraph text",
    variant: "paragraph",
    size: 2,
    fontWeight: "regular",
    fontType: "regular",
    uppercase: false,
    as: "p",
  },
  argTypes: {
    size: {
      control: "select",
      options: paragraphSizeOptions,
    },
    variant: {
      table: { disable: true },
    },
  },
};

const captionSizeOptions = [1] as const satisfies CaptionSize[];
export const Caption: Story = {
  args: {
    children: "Caption text",
    variant: "caption",
    size: 1,
    fontWeight: "regular",
    fontType: "regular",
    uppercase: false,
    as: "span",
  },
  argTypes: {
    size: {
      control: "select",
      options: captionSizeOptions,
    },
    variant: {
      table: { disable: true },
    },
  },
};
