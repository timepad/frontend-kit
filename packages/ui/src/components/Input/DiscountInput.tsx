import { forwardRef } from "react";
import { FormattedInput } from "../FormattedInput";
import { parseDigits, limitLen, normalizePercentValue, formatThousands } from "../FormattedInput/formattedInputHelpers";
import type { DiscountInputProps } from "./input.types";

/**
 * Компонент ввода скидки (в процентах или сумме)
 */
export const DiscountInput = forwardRef<HTMLInputElement, DiscountInputProps>(
  ({ value = "", onValueChange = () => {}, discountType = "percent", label, ...rest }, ref) => {
    // Форматирование: добавляем символ % или валюты
    const formatDiscount = (raw: string): string => {
      if (!raw) return "";

      // Извлекаем цифры
      const digits = parseDigits(raw);
      
      // Если это проценты, ограничиваем до 100%
      if (discountType === "percent") {
        // Ограничиваем до 3 знаков для процентов
        return limitLen(normalizePercentValue(digits), 3);
      }

      // Для суммы форматируем тысячи
      return formatThousands(digits);
    };

    // Парсинг: возвращаем только цифры с нормализацией
    const parseDiscount = (formatted: string): string => {
      const digits = parseDigits(formatted);
      
      // Нормализуем проценты: если > 100, возвращаем 100
      if (discountType === "percent") {
        return normalizePercentValue(digits);
      }
      
      return digits;
    };

    // Суффикс в зависимости от типа скидки
    const suffixSlot = () => discountType === "percent" ? "%" : "₽";

    return (
      <FormattedInput
        {...rest}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        format={formatDiscount}
        parse={parseDiscount}
        suffixSlot={suffixSlot}
        inputMode="numeric"
        emptyVisual="0"
        maxLen={discountType === "percent" ? 3 : 9} // Ограничение до 100% или 999 999 999 для суммы
        label={label || (discountType === "percent" ? "Скидка (%)" : "Скидка (руб.)")}
      />
    );
  }
);

export default DiscountInput;
