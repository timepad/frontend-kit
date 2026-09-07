import { forwardRef } from "react";
import { FormattedInput } from "../FormattedInput";
import { formatThousands, parseDigits } from "../FormattedInput/formattedInputHelpers";
import type { PriceInputProps } from "./input.types";

/**
 * Компонент ввода цены с форматированием
 * Автоматически добавляет символ валюты и форматирует числовое значение
 */
export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value = "", onValueChange = () => {}, currencySymbol = "₽", label, ...rest }, ref) => {
    return (
      <FormattedInput
        {...rest}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        format={formatThousands}
        parse={parseDigits}
        suffixSlot={() => currencySymbol}
        inputMode="numeric"
        emptyVisual="0"
        maxLen={9} // Ограничение до 999 999 999
        label={label || "Цена"}
      />
    );
  }
);

export default PriceInput;
