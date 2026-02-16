import { forwardRef } from "react";
import { FormattedInput } from "../FormattedInput";
import { parseDigits, limitLen } from "../FormattedInput/formattedInputHelpers";
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
        const numValue = parseInt(digits);
        if (!isNaN(numValue) && numValue > 100) {
          return "100";
        }
        // Ограничиваем до 3 знаков для процентов
        return limitLen(digits, 3);
      }

      // Для суммы просто возвращаем цифры
      return digits;
    };

    // Парсинг: возвращаем только цифры
    const parseDiscount = (formatted: string): string => {
      return parseDigits(formatted);
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
