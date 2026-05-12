import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";
import {
  IconCheck16Outline,
  IconPlus16Outline,
} from "../../assets/icons";

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
    stroke: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    text: "Алексей  Ветров",
    size: 48,
  },
};

export const Image: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
  },
};

export const WithStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    stroke: false,
  },
  render: (args) => (
    <Avatar
      image={args.image}
      size={80}
      stroke={args.stroke}
      renderAvatarStatus={({ statusSize }) => (
        <Avatar.AvatarStatus size={statusSize} icon={<IconCheck16Outline />} />
      )}
    />
  ),
};

export const WithStatusSizes: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    stroke: false,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {[40, 48, 64, 80].map((size) => (
        <Avatar
          key={size}
          image={args.image}
          size={size as 40 | 48 | 64 | 80}
          stroke={args.stroke}
          renderAvatarStatus={({ statusSize }) => (
            <Avatar.AvatarStatus size={statusSize} icon={<IconPlus16Outline />} />
          )}
        />
      ))}
    </div>
  ),
};

export const WithStatusOnClick: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    stroke: false,
  },
  argTypes: {
    onClick: {
      control: false,
      table: { disable: true },
    },
  },
  render: (args) => (
    <Avatar
      image={args.image}
      size={64}
      stroke={args.stroke}
      renderAvatarStatus={({ statusSize }) => (
        <Avatar.AvatarStatus
          size={statusSize}
          icon={<IconCheck16Outline />}
          onClick={() => {
            alert("Avatar status clicked");
          }}
        />
      )}
    />
  ),
};

export const WithStatusRenderProp: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    stroke: false,
  },
  argTypes: {
    onClick: {
      control: false,
      table: { disable: true },
    },
  },
  render: (args) => (
    <Avatar
      image={args.image}
      size={64}
      stroke={args.stroke}
      renderAvatarStatus={({ statusSize }) => (
        <Avatar.AvatarStatus
          size={statusSize}
          icon={<IconCheck16Outline />}
          appearance="custom"
          color="#22c55e"
          onClick={(e) => {
            e.stopPropagation();
            alert("AvatarStatus props are set at the call site");
          }}
        />
      )}
    />
  ),
};

export const Square: Story = {
  args: {
    text: "TimePad",
    stroke: true,
    size: 48,
  },
};
