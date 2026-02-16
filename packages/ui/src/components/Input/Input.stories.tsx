import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { StoryFn } from "@storybook/react";

import { Input } from "./Input";
import { PhoneInput } from "./PhoneInput";
import { TimeInput } from "./TimeInput";
import { TimeRangeInput } from "./TimeRangeInput";
import { PriceInput } from "./PriceInput";
import { DiscountInput } from "./DiscountInput";
import type { IInputProps } from "./input.types";

// ============================================
// Base Input Stories
// ============================================

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
    (Story: StoryFn) => (
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

// ============================================
// PhoneInput Stories
// ============================================

type PhoneStory = StoryObj<typeof PhoneInput>;

const PhoneControlled: FC<{ initial?: string }> = ({ initial = "" }) => {
  const [value, setValue] = useState(initial);

  return (
    <>
      <PhoneInput
        value={value}
        onValueChange={setValue}
        label="Телефон"
        placeholders={ {digit : "0"} }
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const PhoneInputDefault: PhoneStory = {
  render: () => <PhoneControlled />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const PhoneInputWithValue: PhoneStory = {
  render: () => <PhoneControlled initial="9123456789" />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const PhoneInputDisabled: PhoneStory = {
  render: () => <PhoneControlled initial="9123456789" />,
  args: {
    disabled: true,
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

// ============================================
// TimeInput Stories
// ============================================

type TimeStory = StoryObj<typeof TimeInput>;

const TimeControlled: FC<{ initial?: string }> = ({ initial = "" }) => {
  const [value, setValue] = useState(initial);

  return (
    <>
      <TimeInput
        value={value}
        onValueChange={setValue}
        label="Время"
        placeholders={{ digit: "0" }}
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const TimeInputDefault: TimeStory = {
  render: () => <TimeControlled />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const TimeInputWithValue: TimeStory = {
  render: () => <TimeControlled initial="1830" />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const TimeInputDisabled: TimeStory = {
  render: () => <TimeControlled initial="1830" />,
  args: {
    disabled: true,
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

// ============================================
// TimeRangeInput Stories
// ============================================

type TimeRangeStory = StoryObj<typeof TimeRangeInput>;

const TimeRangeControlled: FC<{ initial?: string }> = ({ initial = "" }) => {
  const [value, setValue] = useState(initial);

  return (
    <>
      <TimeRangeInput
        value={value}
        onValueChange={setValue}
        label="Временной диапазон"
        placeholders={{ digit: "0" }}
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const TimeRangeInputDefault: TimeRangeStory = {
  render: () => <TimeRangeControlled />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const TimeRangeInputWithValue: TimeRangeStory = {
  render: () => <TimeRangeControlled initial="09001800" />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const TimeRangeInputDisabled: TimeRangeStory = {
  render: () => <TimeRangeControlled initial="09001800" />,
  args: {
    disabled: true,
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

// ============================================
// PriceInput Stories
// ============================================

type PriceStory = StoryObj<typeof PriceInput>;

const PriceControlled: FC<{ initial?: string }> = ({ initial = "" }) => {
  const [value, setValue] = useState(initial);

  return (
    <>
      <PriceInput
        value={value}
        onValueChange={setValue}
        label="Цена"
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const PriceInputDefault: PriceStory = {
  render: () => <PriceControlled />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const PriceInputWithValue: PriceStory = {
  render: () => <PriceControlled initial="5000" />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const PriceInputDisabled: PriceStory = {
  render: () => <PriceControlled initial="5000" />,
  args: {
    disabled: true,
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const PriceInputCustomCurrency: PriceStory = {
  render: () => <PriceControlled initial="1000" />,
  args: {
    currencySymbol: "$",
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

// ============================================
// DiscountInput Stories
// ============================================

type DiscountStory = StoryObj<typeof DiscountInput>;

const DiscountControlled: FC<{ initial?: string; discountType?: "percent" | "amount" }> = ({ 
  initial = "", 
  discountType = "percent" 
}) => {
  const [value, setValue] = useState(initial);

  return (
    <>
      <DiscountInput
        value={value}
        onValueChange={setValue}
        label="Скидка"
        discountType={discountType}
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const DiscountInputDefault: DiscountStory = {
  render: () => <DiscountControlled />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const DiscountInputPercent: DiscountStory = {
  render: () => <DiscountControlled initial="25" discountType="percent" />,
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const DiscountInputAmount: DiscountStory = {
  render: () => <DiscountControlled initial="500" discountType="amount" />,
  args: {
    discountType: "amount",
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};

export const DiscountInputDisabled: DiscountStory = {
  render: () => <DiscountControlled initial="25" />,
  args: {
    disabled: true,
  },
  parameters: {
    layout: "centered",
    decorators: [
      (Story: StoryFn) => (
        <div style={{ width: 340 }}>
          <Story />
        </div>
      ),
    ],
  },
};
