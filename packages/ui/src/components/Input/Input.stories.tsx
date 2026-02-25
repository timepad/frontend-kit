import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { StoryFn } from "@storybook/react";

import { Input } from "./Input";
import { PhoneInput } from "./PhoneInput";
import { TimeInput } from "./TimeInput";
import { PriceInput } from "./PriceInput";
import { DiscountInput } from "./DiscountInput";
import type {
  IInputProps,
  PhoneInputProps,
  TimeInputProps,
  PriceInputProps,
  DiscountInputProps,
} from "./input.types";

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

const PhoneControlled: FC<PhoneInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <>
      <PhoneInput
        {...args}
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
  render: (args) => <PhoneControlled {...args} />,
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
  render: (args) => <PhoneControlled {...args} value="9123456789" />,
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
  render: (args) => <PhoneControlled {...args} value="9123456789" />,
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

const TimeControlled: FC<TimeInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <>
      <TimeInput
        {...args}
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
  render: (args) => <TimeControlled {...args} />,
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
  render: (args) => <TimeControlled {...args} value="1830" />,
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
  render: (args) => <TimeControlled {...args} value="1830" />,
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

const PriceControlled: FC<PriceInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <>
      <PriceInput
        {...args}
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
  render: (args) => <PriceControlled {...args} />,
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
  render: (args) => <PriceControlled {...args} value="5000" />,
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
  render: (args) => <PriceControlled {...args} value="5000" />,
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
  render: (args) => <PriceControlled {...args} value="1000" />,
  args: {
    currencySymbol: "₸",
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

const DiscountControlled: FC<DiscountInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <>
      <DiscountInput
        {...args}
        value={value}
        onValueChange={setValue}
        label="Скидка"
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const DiscountInputDefault: DiscountStory = {
  render: (args) => <DiscountControlled {...args} />,
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
  render: (args) => <DiscountControlled {...args} value="25" />,
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
  render: (args) => <DiscountControlled {...args} value="500" />,
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
  render: (args) => <DiscountControlled {...args} value="25" />,
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

