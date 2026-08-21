import { forwardRef } from "react";
import { FormattedInput } from "../FormattedInput";
import { parseDigits, normalizePercentValue, formatThousands } from "../FormattedInput/formattedInputHelpers";
import type { DiscountInputProps } from "./input.types";

const DISCOUNT_INPUT_CONFIG = {
  percent: {
    format: (raw: string) => normalizePercentValue(parseDigits(raw)),
    parse: (formatted: string) => normalizePercentValue(parseDigits(formatted)),
    suffixSlot: () => "%",
    maxLen: 3,
    label: "Скидка (%)",
  },
  amount: {
    format: formatThousands,
    parse: parseDigits,
    suffixSlot: () => "₽",
    maxLen: 9,
    label: "Скидка (руб.)",
  },
};

/**
 * Компонент ввода скидки (в процентах или сумме)
 */
export const DiscountInput = forwardRef<HTMLInputElement, DiscountInputProps>(
  ({ value = "", onValueChange = () => {}, discountType = "percent", label, ...rest }, ref) => {
    const config = DISCOUNT_INPUT_CONFIG[discountType];

    return (
      <FormattedInput
        {...rest}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        format={config.format}
        parse={config.parse}
        suffixSlot={config.suffixSlot}
        inputMode="numeric"
        emptyVisual="0"
        maxLen={config.maxLen}
        label={label || config.label}
      />
    );
  }
);

export default DiscountInput;
