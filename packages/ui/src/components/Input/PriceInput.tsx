import { forwardRef, useCallback } from "react";
import { FormattedInput } from "../FormattedInput";
import { formatThousands, parseDigits } from "../FormattedInput/formattedInputHelpers";
import type { PriceInputProps } from "./input.types";

const formatPrice = (raw: string): string => formatThousands(raw);
const parsePrice = (formatted: string): string => parseDigits(formatted);

/**
 * Компонент ввода цены с форматированием
 * Автоматически добавляет символ валюты и форматирует числовое значение
 */
export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value = "", onValueChange = () => {}, currencySymbol = "₽", label, ...rest }, ref) => {
    const suffixSlot = useCallback(() => currencySymbol, [currencySymbol]);

    return (
      <FormattedInput
        {...rest}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        format={formatPrice}
        parse={parsePrice}
        suffixSlot={suffixSlot}
        inputMode="numeric"
        emptyVisual="0"
        maxLen={9} // Ограничение до 999 999 999
        label={label || "Цена"}
      />
    );
  }
);

export default PriceInput;
