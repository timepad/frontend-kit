import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Avatar } from "./Avatar";
import type { AvatarSizeWithStatus } from "./avatar.types";
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

// Расширенный тип для args со статусом
type ArgsWithStatus = {
  text?: string;
  image?: string;
  size?: AvatarSizeWithStatus;
  stroke?: boolean;
  statusClickable?: boolean;
};

// DEFAULT
export const Default: Story = {
  args: {
    text: "Алексей Ветров",
    size: 40,
    stroke: false,
  },
  render: (args) => {
    const { text, size, stroke } = args;
    return <Avatar text={text} size={size} stroke={stroke} />;
  },
};

// TEXT (без статуса)
export const TextWithoutStatus: Story = {
  args: {
    text: "Алексей Ветров",
    size: 48,
    stroke: false,
  },
  argTypes: {
    text: {
      control: "text",
      description: "Текст для отображения в аватаре",
    },
    size: {
      control: "select",
      options: [24, 32, 40, 48, 64, 80],
    },
    stroke: {
      control: "boolean",
    },
  },
  render: (args) => {
    const { text, size = 48, stroke } = args;
    return <Avatar text={text} size={size} stroke={stroke} />;
  },
};

// TEXT (со статусом)
export const TextWithStatus: Story = {
  args: {
    text: "Алексей Ветров",
    size: 64,
    stroke: false,
    // @ts-expect-error statusClickable не входит в IAvatarProps, но нужен для Controls
    statusClickable: true,
  },
  argTypes: {
    text: {
      control: "text",
      description: "Текст для отображения в аватаре",
    },
    size: {
      control: "select",
      options: [40, 48, 64, 80],
      description: "Только размеры, поддерживающие статус",
    },
    stroke: {
      control: "boolean",
    },
    // @ts-expect-error statusClickable не входит в IAvatarProps, но нужен для Controls
    statusClickable: {
      control: "boolean",
      description: "Статус кликабельный",
    },
  },
  render: (args) => {
    const { text, size = 64, stroke, statusClickable = true } = args as ArgsWithStatus;
    return (
        <Avatar
            text={text}
            size={size as AvatarSizeWithStatus}
            stroke={stroke}
            renderAvatarStatus={({ statusSize }) => (
                <Avatar.AvatarStatus
                    size={statusSize}
                    icon={<IconCheck16Outline />}
                    onClick={statusClickable ? () => alert("Avatar status clicked") : undefined}
                />
            )}
        />
    );
  },
};

// IMAGE (без статуса)
export const ImageWithoutStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    stroke: false,
  },
  argTypes: {
    image: {
      control: "text",
      description: "URL изображения для аватара",
    },
    size: {
      control: "select",
      options: [24, 32, 40, 48, 64, 80],
    },
    stroke: {
      control: "boolean",
    },
  },
  render: (args) => {
    const { image, size = 64, stroke } = args;
    return <Avatar image={image} size={size} stroke={stroke} />;
  },
};

// IMAGE (со статусом)
export const ImageWithStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 64,
    stroke: false,
    // @ts-expect-error statusClickable не входит в IAvatarProps, но нужен для Controls
    statusClickable: true,
  },
  argTypes: {
    image: {
      control: "text",
      description: "URL изображения для аватара",
    },
    size: {
      control: "select",
      options: [40, 48, 64, 80],
      description: "Только размеры, поддерживающие статус",
    },
    stroke: {
      control: "boolean",
    },
    // @ts-expect-error statusClickable не входит в IAvatarProps, но нужен для Controls
    statusClickable: {
      control: "boolean",
      description: "Статус кликабельный",
    },
  },
  render: (args) => {
    const { image, size = 64, stroke, statusClickable = true } = args as ArgsWithStatus;
    return (
        <Avatar
            image={image}
            size={size as AvatarSizeWithStatus}
            stroke={stroke}
            renderAvatarStatus={({ statusSize }) => (
                <Avatar.AvatarStatus
                    size={statusSize}
                    icon={<IconPlus16Outline />}
                    onClick={statusClickable ? () => alert("Avatar status clicked") : undefined}
                />
            )}
        />
    );
  },
};