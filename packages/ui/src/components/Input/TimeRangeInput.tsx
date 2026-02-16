import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";
import type { TimeRangeInputProps } from "./input.types";

/**
 * Компонент ввода временного диапазона (например, "09:00-18:00")
 * Использует маску для форматирования ввода
 */
export const TimeRangeInput = forwardRef<HTMLInputElement, TimeRangeInputProps>(
  ({ value = "", onValueChange = () => {}, label, ...rest }, ref) => {
    // Маска для временного диапазона: HH:MM - HH:MM
    const mask = "99:99 - 99:99";

    return (
      <MaskedInput
        {...rest}
        ref={ref}
        mask={mask}
        value={value}
        onValueChange={onValueChange}
        label={label || "Временной диапазон"}
      />
    );
  }
);

export default TimeRangeInput;
