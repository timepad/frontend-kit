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
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "Подпись (лейбл) над полем ввода.",
      table: { type: { summary: "ReactNode" } },
    },
    value: {
      control: "text",
      description: "Значение поля (контролируемый режим).",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Плейсхолдер внутри поля ввода.",
      table: { type: { summary: "string" } },
    },
    description: {
      control: "text",
      description:
        "Вспомогательный текст под полем. Показывается только если нет `error`.",
      table: { type: { summary: "ReactNode" } },
      defaultValue: { summary: "" },
    },
    error: {
      control: "text",
      description:
        "Текст ошибки под полем. Если задан, отображается вместо `description` и включает состояние ошибки.",
      table: { type: { summary: "ReactNode" } },
      defaultValue: { summary: "" },
    },
    required: {
      control: "boolean",
      description: "Делает поле обязательным (нативный HTML `required`).",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      control: "boolean",
      description: "Отключает поле ввода.",
      table: { type: { summary: "boolean" } },
    },
    onClearField: {
      action: "clear",
      description: "Обработчик события очистки значения поля.",
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const BaseInput: FC<IInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClearField={() => setValue("")}
    />
  );
};

const defaultArgs: Story["args"] = {
  label: "Название",
  placeholder: "Введите название",
  error: "",
  value: "",
  description: "",
  required: false,
  disabled: false,
};

export const Default: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultArgs },
};

export const WithDescription: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultArgs, description: "Описание поля" },
};

export const Required: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultArgs, required: true },
};

export const Error: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultArgs, error: "Какая-то ошибка" },
};

export const Disabled: Story = {
  render: (args) => <BaseInput {...(args as any)} />,
  args: {
    ...defaultArgs,
    description: "Описание поля",
    disabled: true,
    value: "abcd-1234-efgh-5678",
  },
};
