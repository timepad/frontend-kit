import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";
import { ITextareaProps } from "./textarea.types";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
      description: "Подпись (лейбл) над текстовым полем.",
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
        "Вспомогательный текст под полем. Показывается, если нет ошибки.",
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
    maxSymbols: {
      control: "number",
      description:
        "Максимальное количество символов. Показывает счётчик и визуальную ошибку при превышении. Отображается, если не задано описание и нет ошибки",
      table: { type: { summary: "ReactNode" } },
      defaultValue: { summary: 0 },
    },
    required: {
      control: "boolean",
      description: "Делает поле обязательным (нативный HTML `required`).",
      table: { type: { summary: "boolean" } },
    },
    resize: {
      description: `
Разрешает изменение размера textarea пользователем.
   
- **true** — разрешён resize (по вертикали)
- **false** — фиксированный размер (по умолчанию)
      `,
      control: "boolean",
      table: { type: { summary: "boolean" } },
      defaultValue: { summary: false },
    },
    disabled: {
      control: "boolean",
      description: "Отключает поле ввода.",
      table: { type: { summary: "boolean" } },
    },
    size: {
      description: `
 Размер текстового поля.

 - **s** — компактный вариант (меньшая высота, используется в плотных интерфейсах)
 - **m** — стандартный размер (по умолчанию)
      `,
      control: "inline-radio",
      options: ["s", "m"],
      table: {
        type: { summary: "s | m" },
        defaultValue: { summary: "m" },
      },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const BaseTextarea: FC<ITextareaProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const defaultArgs: Story["args"] = {
  label: "Название",
  placeholder: "Введите значение",
  error: "",
  value: "",
  description: "",
  maxSymbols: undefined,
  required: false,
  disabled: false,
  resize: false,
  size: "m",
};

export const Default: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs },
};

export const WithDescription: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs, description: "Описание поля" },
};

export const WithMaxSymbols: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs, description: undefined, maxSymbols: 20 },
};

export const Required: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs, required: true },
};

export const Error: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs, error: "Какая-то ошибка" },
};

export const Disabled: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: {
    ...defaultArgs,
    description: "Описание поля",
    disabled: true,
    value: "Поле недоступно для редактирования",
  },
};

export const ResizeEnabled: Story = {
  render: (args) => <BaseTextarea {...args} />,
  args: { ...defaultArgs, resize: true },
};
