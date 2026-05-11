import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";
import {
  IconCheck16Outline,
  IconCheck24Outline,
  IconPlus16Outline,
  IconPlus24Outline,
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
    icon: {
      description: `
Иконка для AvatarStatus в режиме withStatus.
      `,
      control: "select",
      options: [
        "Check16Outline",
        "Check24Outline",
        "Plus16Outline",
        "Plus24Outline",
      ],
      mapping: {
        Check16Outline: <IconCheck16Outline />,
        Check24Outline: <IconCheck24Outline />,
        Plus16Outline: <IconPlus16Outline />,
        Plus24Outline: <IconPlus24Outline />,
      },
      table: {
        type: { summary: "ReactElement<SVG>" },
      },
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
    icon: <IconCheck16Outline />,
  },
};

export const WithStatusSizes: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    icon: <IconPlus16Outline />,
    stroke: false,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {[40, 48, 64, 80].map((size) => (
        <Avatar
          key={size}
          image={args.image}
          size={size as 40 | 48 | 64 | 80}
          icon={args.icon}
          stroke={args.stroke}
        />
      ))}
    </div>
  ),
};

export const WithStatusOnClick: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    icon: <IconCheck16Outline />,
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
      icon={args.icon}
      stroke={args.stroke}
      onClick={() => {
        alert("Avatar status clicked");
      }}
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
