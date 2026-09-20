import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";
import { Typography } from "../Typography";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 400,
          minHeight: 200,
          height: "100%",
          background: "#F4F2F8",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    card: "Grid is awesome",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!",
  },
};

export const WithTypography: Story = {
  args: {
    card: (
      <Typography.Paragraph tag="P3 BOLD">
        Заголовок секции
      </Typography.Paragraph>
    ),
    children: (
      <Typography.Paragraph tag="P4 REGULAR">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Typography.Paragraph>
    ),
  },
};

export const Group: Story = {
  args: {
    card: "Grid is awesome",
  },
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      <Accordion card="Grid is awesome" defaultOpen>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
      <Accordion card="It's full of neat tricks">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
        harum autem delectus mollitia ab assumenda nemo facilis ea aliquam
        deleniti earum recusandae.
      </Accordion>
      <Accordion card="Tell me more">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, amet!
      </Accordion>
    </div>
  ),
};
