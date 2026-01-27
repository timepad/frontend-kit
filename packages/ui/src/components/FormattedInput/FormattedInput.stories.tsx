// FormattedInput.stories.tsx
import { FC, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { FormattedInput } from "./FormattedInput";
import type { FormattedInputProps } from "./FormattedInput";
import { parseDigits, formatThousands, normalizeLeadingZeros } from "./formattedInput.utils";

const meta: Meta<typeof FormattedInput> = {
  title: "Components/FormattedInput",
  component: FormattedInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },

    emptyVisual: { control: "text" },
    showEmptyVisual: { control: "boolean" },
    maxLen: { control: "number" },
    inputMode: { control: "text" },

    onFocus: { action: "focus" },
    onBlur: { action: "blur" },
    onClearField: { action: "clear" },
    onValueChange: { action: "valueChange" },
  },
};

export default meta;
type Story = StoryObj<typeof FormattedInput>;

type ControlledProps = Omit<FormattedInputProps, "value" | "onValueChange"> & {
  initial?: string;
};

const Controlled: FC<ControlledProps> = ({ initial = "", ...args }) => {
  const [raw, setRaw] = useState(initial);

  const value = raw;

  return (
    <>
      <FormattedInput
        {...(args as any)}
        value={value}
        onValueChange={(v) => {
          (args as any).onValueChange?.(v);
          setRaw(v);
        }}
        onClearField={
          args.onClearField
            ? (e) => {
                args.onClearField?.(e as any);
                setRaw("");
              }
            : undefined
        }
      />
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
        RAW: <code>{value || "∅"}</code>
      </div>
    </>
  );
};

export const Price: Story = {
  render: (args) => <Controlled {...(args as any)} />,
  args: {
    label: "Цена",
    description: "Введите сумму",
    inputMode: "numeric",

    // raw: "3000" -> display: "3 000"
    parse: (t: string) => normalizeLeadingZeros(parseDigits(t)),
    format: (r: string) => formatThousands(r, " "),

    emptyVisual: "0",
    showEmptyVisual: true,

    suffixSlot: () => "₽",
    onClearField: () => {},
  } as any,
};

export const Discount: Story = {
  render: (args) => <Controlled {...(args as any)} />,
  args: {
    label: "Скидка",
    description: "0–100",
    inputMode: "numeric",

    // raw digits only, ограничим 3 цифрами
    maxLen: 3,
    parse: (t: string) => {
      const d = parseDigits(t);
      // 0..100
      if (!d) return "";
      const n = Math.min(100, Math.max(0, Number(d)));
      return String(n);
    },
    format: (r: string) => r,

    emptyVisual: "0",
    showEmptyVisual: true,
    
    suffixSlot: () => "%",
    onClearField: () => {},
  } as any,
};
