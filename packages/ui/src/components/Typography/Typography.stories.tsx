import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";
import {
  CAPTION_VARIANT_CONFIG,
  CaptionVariantTag,
  HEADER_VARIANT_CONFIG,
  HeaderVariantTag,
  LEAD_VARIANT_CONFIG,
  LeadVariantTag,
  PARAGRAPH_VARIANT_CONFIG,
  ParagraphVariantTag,
} from "./typography.types";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyLead: Story = {
  args: {
    children: "Typography Lead",
    variant: "lead",
    size: 1,
    fontWeight: "bold",
    fontType: "accent",
    uppercase: false,
  },
  argTypes: {
    variant: {
      control: false,
      table: { disable: true },
    },
    fontType: {
      control: false,
      table: { disable: true },
    },
    fontWeight: {
      control: false,
      table: { disable: true },
    },
    size: {
      control: "inline-radio",
      options: [1, 2, 3],
    },
    uppercase: {
      control: "boolean",
    },
    as: {
      control: "inline-radio",
      options: ["h1", "h2", "h3"],
    },
    innerRef: {
      control: false,
      table: { disable: true },
    },
  },
};

export const TypographyHeader: Story = {
  args: {
    children: "Typography Header",
    variant: "header",
    size: 1,
    fontWeight: "bold",
    fontType: "accent",
  },
  argTypes: {
    variant: {
      control: false,
      table: { disable: true },
    },
    fontType: {
      control: "inline-radio",
      options: ["accent", "regular"],
    },
    fontWeight: {
      control: "inline-radio",
      options: ["bold", "medium"],
    },
    size: {
      control: "inline-radio",
      options: [1, 2, 3, 4],
    },
    uppercase: {
      control: false,
      table: { disable: true },
    },
    as: {
      control: "inline-radio",
      options: ["h3", "h4", "h5", "h6"],
    },
    innerRef: {
      control: false,
      table: { disable: true },
    },
  },
};

export const TypographyParagraph: Story = {
  args: {
    children: "Typography Paragraph",
    variant: "paragraph",
    size: 1,
    fontWeight: "bold",
    fontType: "regular",
  },
  argTypes: {
    variant: {
      control: false,
      table: { disable: true },
    },
    fontType: {
      control: false,
      table: { disable: true },
    },
    fontWeight: {
      control: "inline-radio",
      options: ["bold", "semi-bold", "regular"],
    },
    size: {
      control: "inline-radio",
      options: [1, 2, 3, 4],
    },
    uppercase: {
      control: "boolean",
    },
    as: {
      control: "inline-radio",
      options: ["p", "span", "div"],
    },
    innerRef: {
      control: false,
      table: { disable: true },
    },
  },
};

export const TypographyCaption: Story = {
  args: {
    children: "Typography Caption",
    variant: "caption",
    size: 1,
    fontWeight: "bold",
    fontType: "regular",
  },
  argTypes: {
    variant: {
      control: false,
      table: { disable: true },
    },
    size: {
      control: false,
      table: { disable: true },
    },
    fontType: {
      control: false,
      table: { disable: true },
    },
    fontWeight: {
      control: "inline-radio",
      options: ["bold", "semi-bold", "regular"],
    },
    uppercase: {
      control: "boolean",
    },
    as: {
      control: "inline-radio",
      options: ["p", "span", "div"],
    },
    innerRef: {
      control: false,
      table: { disable: true },
    },
  },
};

const argTypes: Meta<typeof Typography>["argTypes"] = {
  variant: {
    control: false,
    table: { disable: true },
  },
  size: {
    control: false,
    table: { disable: true },
  },
  fontType: {
    control: false,
    table: { disable: true },
  },
  fontWeight: {
    control: false,
    table: { disable: true },
  },
  uppercase: {
    control: false,
    table: { disable: true },
  },
  as: {
    control: false,
    table: { disable: true },
  },
  innerRef: {
    control: false,
    table: { disable: true },
  },
  children: {
    control: false,
    table: { disable: true },
  },
};

export const TypographyLeadAllVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(LEAD_VARIANT_CONFIG).map(([tag, configs]) => (
        <div key={tag}>
          <div
            key={tag}
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {tag}
          </div>
          <Typography.Lead {...configs} tag={tag as LeadVariantTag}>
            Lead {tag}
          </Typography.Lead>
        </div>
      ))}
    </div>
  ),
  args: {
    children: "",
    variant: "lead",
    size: 1,
    fontType: "accent",
    fontWeight: "bold",
  },
  argTypes,
};

export const TypographyHeaderAllVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(HEADER_VARIANT_CONFIG).map(([tag, configs]) => (
        <div key={tag}>
          <div
            key={tag}
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {tag}
          </div>
          <Typography.Header {...configs} tag={tag as HeaderVariantTag}>
            Header {tag}
          </Typography.Header>
        </div>
      ))}
    </div>
  ),
  args: {
    children: "",
    variant: "header",
    size: 1,
    fontType: "accent",
    fontWeight: "bold",
  },
  argTypes,
};

export const TypographyParagraphAllVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(PARAGRAPH_VARIANT_CONFIG).map(([tag, configs]) => (
        <div key={tag}>
          <div
            key={tag}
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {tag}
          </div>
          <Typography.Paragraph {...configs} tag={tag as ParagraphVariantTag}>
            Header {tag}
          </Typography.Paragraph>
        </div>
      ))}
    </div>
  ),
  args: {
    children: "",
    variant: "paragraph",
    size: 1,
    fontType: "regular",
    fontWeight: "regular",
  },
  argTypes,
};

export const TypographyCaptionAllVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(CAPTION_VARIANT_CONFIG).map(([tag, configs]) => (
        <div key={tag}>
          <div
            key={tag}
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 4,
              fontFamily: "monospace",
            }}
          >
            {tag}
          </div>
          <Typography.Caption {...configs} tag={tag as CaptionVariantTag}>
            Header {tag}
          </Typography.Caption>
        </div>
      ))}
    </div>
  ),
  args: {
    children: "",
    variant: "caption",
    size: 1,
    fontType: "regular",
    fontWeight: "regular",
  },
  argTypes,
};
