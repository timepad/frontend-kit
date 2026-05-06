import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
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
      options: [24, 32, 40, 48, 64, 80],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    name: "Алексей  Ветров",
    size: 48,
  },
};

export const Image: Story = {
  args: {
    src: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    alt: "User photo",
    size: 64,
  },
};

export const WithStatus: Story = {
  args: {
    src: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    alt: "User photo",
    size: 64,
    withStatus: true,
  },
};

export const WithStatusSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {[40, 48, 64, 80].map((size) => (
        <Avatar
          key={size}
          src="https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg"
          alt={`User photo ${size}`}
          size={size as 40 | 48 | 64 | 80}
          withStatus
        />
      ))}
    </div>
  ),
};

export const Square: Story = {
  args: {
    name: "TimePad",
    square: true,
    bordered: true,
    size: 48,
  },
};
