import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";
import { ITextareaProps } from "./textarea.types";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    description: {
      control: "text",
    },
    error: {
      control: "text",
    },
    maxSymbols: {
      control: "number",
    },
    resize: {
      control: "boolean",
    },
    size: {
      control: "inline-radio",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const ControlledTextarea: FC<ITextareaProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    placeholder: "Введите текст...",
  },
};

export const WithDescription: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    description: "Это описание под полем",
    placeholder: "Введите текст...",
  },
};

export const WithMaxSymbols: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    maxSymbols: 100,
    placeholder: "Введите текст...",
  },
};

export const WithDescriptionAndMaxSymbols: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    description: "Это описание под полем",
    placeholder: "Введите текст...",
    maxSymbols: 20,
  },
};

export const Required: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Описание",
    required: true,
    placeholder: "Обязательное поле",
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    disabled: true,
    value: "Поле недоступно для редактирования",
  },
};

export const Error: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    error: "Это поле обязательно",
    placeholder: "Введите текст...",
  },
};

export const ResizeEnabled: Story = {
  render: (args) => <ControlledTextarea {...args} />,
  args: {
    label: "Комментарий",
    resize: true,
    maxSymbols: 100,
    placeholder: "Теперь можно менять размер",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16, maxWidth: 500 }}>
      <ControlledTextarea {...args} size="s" label="Размер S" />
      <ControlledTextarea {...args} size="m" label="Размер M" />
    </div>
  ),
  args: {
    placeholder: "Введите текст...",
    maxSymbols: 50,
  },
};
