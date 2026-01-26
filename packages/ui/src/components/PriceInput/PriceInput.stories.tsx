// PriceInput.stories.tsx
import { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PriceInput } from "./PriceInput";
import type { PriceInputProps } from "./PriceInput";

const meta: Meta<typeof PriceInput> = {
  title: "Components/PriceInput",
  component: PriceInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },

    currency: { control: "text" },
    thousandSeparator: { control: "text" },

    allowEmpty: { control: "boolean" },
    maxDigits: { control: "number" },
    forbidZero: { control: "boolean" },
    rightReservePx: { control: "number" },

    onFocus: { action: "focus" },
    onBlur: { action: "blur" },
    onClearField: { action: "clear" },
    onValueChange: { action: "valueChange" },
  },
};

export default meta;
type Story = StoryObj<typeof PriceInput>;

const Controlled: FC<PriceInputProps> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <div style={{ width: 320 }}>
      <PriceInput
        {...args}
        value={value}
        onValueChange={(v) => {
          args.onValueChange?.(v);
          setValue(v);
        }}
        onClearField={
          args.onClearField
            ? (e) => {
                args.onClearField?.(e as any);
                setValue("");
              }
            : undefined
        }
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Цена",
    placeholder: "0",
    currency: "₽",
    thousandSeparator: " ",
    allowEmpty: true,
    maxDigits: 15,
    rightReservePx: 32,
    onClearField: () => {},
  },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Цена",
    value: "1234567",
    placeholder: "0",
    currency: "₽",
    thousandSeparator: " ",
    allowEmpty: true,
    rightReservePx: 32,
    onClearField: () => {},
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...(args as any)} />,
  args: {
    label: "Цена",
    disabled: true,
    value: "999999",
    description: "Поле недоступно",
    currency: "₽",
    thousandSeparator: " ",
  },
};

export const ErrorFromOutside: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Цена",
    value: "1000",
    error: "Некорректная сумма",
    currency: "₽",
    thousandSeparator: " ",
    onClearField: () => {},
  },
};

export const ForbidZero: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Цена",
    value: "0",
    forbidZero: true,
    currency: "₽",
    thousandSeparator: " ",
    onClearField: () => {},
  },
};
