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
    },
    error: {
      control: "text",
      description:
        "Текст ошибки под полем. Если задан, отображается вместо `description` и включает состояние ошибки.",
      table: { type: { summary: "ReactNode" } },
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

const defaultParams = {
  args: {
    label: "Название",
    placeholder: "Введите название",
    error: "",
    value: "",
    description: "",
    required: false,
    disabled: false,
  },
  argTypes: {
    onClearField: {
      table: { disable: true },
    },
  },
};

export const Default: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultParams.args },
  argTypes: { ...defaultParams.argTypes },
};

export const WithDescription: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultParams.args, description: "Описание поля" },
  argTypes: { ...defaultParams.argTypes },
};

export const Required: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultParams.args, required: true },
  argTypes: { ...defaultParams.argTypes },
};

export const Error: Story = {
  render: (args) => <BaseInput {...args} />,
  args: { ...defaultParams.args, error: "Какая-то ошибка" },
  argTypes: { ...defaultParams.argTypes },
};

export const Disabled: Story = {
  render: (args) => <BaseInput {...(args as any)} />,
  args: {
    ...defaultParams.args,
    description: "Описание поля",
    disabled: true,
    value: "abcd-1234-efgh-5678",
  },
  argTypes: { ...defaultParams.argTypes },
};
