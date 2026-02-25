import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";
import { normalizeTimeValue } from "../FormattedInput/formattedInputHelpers";
import type { TimeInputProps } from "./input.types";

/**
 * Компонент ввода времени с маской
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value = "", onValueChange = () => {}, label, onBlur, ...rest }, ref) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Нормализуем значение при потере фокуса
      const normalized = normalizeTimeValue(value);
      if (normalized !== value) {
        onValueChange(normalized);
      }
      onBlur?.(e);
    };

    return (
      <MaskedInput
        {...rest}
        ref={ref}
        mask={"99:99"}
        value={value}
        onValueChange={onValueChange}
        label={label || "Время"}
        onBlur={handleBlur}
      />
    );
  }
);

export default TimeInput;
