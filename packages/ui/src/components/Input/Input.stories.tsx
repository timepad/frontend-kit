import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";
import type { IInputProps } from "./input.types";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
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
    onChange: { action: "change" },
    onFocus: { action: "focus" },
    onBlur: { action: "blur" },
    onClearField: { action: "clear" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Controlled: FC<IInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClearField={
        args.onClearField
          ? (e) => {
              args.onClearField?.(e);
              setValue("");
            }
          : undefined
      }
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Название",
    placeholder: "Введите название",
  },
};

export const WithDescription: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Название",
    description: "Подсказка под полем",
    placeholder: "Введите название",
  },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Название",
    required: true,
    placeholder: "Обязательное поле",
  },
};

export const Error: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Название",
    error: "Это поле обязательно",
    placeholder: "Введите название",
  },
};

export const ClearButton: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Название",
    value: "Можно очистить",
    placeholder: "Введите название",
    onClearField: () => {},
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...(args as any)} />,
  args: {
    label: "Токен",
    disabled: true,
    value: "abcd-1234-efgh-5678",
    description: "Можно скопировать значение",
  },
};

export const LongValue: Story = {
  render: (args) => <Controlled {...(args as any)} />,
  args: {
    label: "Ссылка",
    value:
      "https://example.com/some/very/long/path?with=query&params=and_more=true",
    placeholder: "Введите ссылку",
    onClearField: () => {},
  },
};