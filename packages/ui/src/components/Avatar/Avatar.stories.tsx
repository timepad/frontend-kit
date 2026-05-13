import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";
import {AvatarSizeWithStatus, IAvatarProps} from "./avatar.types";
import { IconCheck16Outline, IconPlus16Outline } from "../../assets/icons";

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
    size: 40,
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
    const { text, size = 40, stroke } = args;
    return <Avatar text={text} size={size} stroke={stroke} />;
  },
};

// TEXT (со статусом)
export const TextWithStatus: Story = {
  args: {
    text: "Алексей Ветров",
    size: 40,
    stroke: false,
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
  },
  render: (args) => {
    const { text, size = 40, stroke } = args as IAvatarProps;
    return (
        <Avatar
            text={text}
            size={size as AvatarSizeWithStatus}
            stroke={stroke}
            renderAvatarStatus={({ statusSize }) => (
                <Avatar.AvatarStatus size={statusSize} icon={<IconCheck16Outline />} />
            )}
        />
    );
  },
};

// IMAGE (без статуса)
export const ImageWithoutStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 40,
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
    const { image, size = 40, stroke } = args;
    return <Avatar image={image} size={size} stroke={stroke} />;
  },
};

// IMAGE (со статусом)
export const ImageWithStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    size: 40,
    stroke: false,
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
  },
  render: (args) => {
    const { image, size = 40, stroke } = args as IAvatarProps;
    return (
        <Avatar
            image={image}
            size={size as AvatarSizeWithStatus}
            stroke={stroke}
            renderAvatarStatus={({ statusSize }) => (
                <Avatar.AvatarStatus size={statusSize} icon={<IconPlus16Outline />} />
            )}
        />
    );
  },
};

// IMAGE WITH CLICKABLE STATUS (можно очистить image и добавить text)
export const ImageWithClickableStatus: Story = {
  args: {
    image: "https://i.pinimg.com/736x/e1/13/f6/e113f64f714bcf8a32d0b183727e8f38--avatar-film-avatar-theme.jpg",
    text: "Алексей Ветров",
    size: 64,
    stroke: false,
  },
  argTypes: {
    image: {
      control: "text",
      description: "URL изображения (очистите поле, чтобы показать текст)",
    },
    text: {
      control: "text",
      description: "Текст для отображения, если image пустой",
    },
    size: {
      control: "select",
      options: [40, 48, 64, 80],
      description: "Только размеры, поддерживающие статус",
    },
    stroke: {
      control: "boolean",
    },
  },
  render: (args) => {
    const { image, text, size = 64, stroke } = args;

    const handleStatusClick = () => {
      alert("Avatar status clicked!");
    };

    const hasImage = image && image.trim() !== "";

    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Avatar
              {...(hasImage
                      ? { image, size: size as AvatarSizeWithStatus, stroke }
                      : { text: text || "Алексей Ветров", size: size as AvatarSizeWithStatus, stroke }
              )}
              renderAvatarStatus={({ statusSize }) => (
                  <Avatar.AvatarStatus
                      size={statusSize}
                      icon={<IconCheck16Outline />}
                      onClick={handleStatusClick}
                      style={{ cursor: "pointer" }}
                  />
              )}
          />
        </div>
    );
  },
};
