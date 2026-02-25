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
    // Форматирование: разбиение числа на разряды и добавление валюты
    const formatPrice = (raw: string): string => {
      return formatThousands(raw);
    };

    // Парсинг: возвращаем только цифры
    const parsePrice = (formatted: string): string => {
      return parseDigits(formatted);
    };

    // Функция для отображения суффикса (валюты)
    const suffixSlot = () => currencySymbol;

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
