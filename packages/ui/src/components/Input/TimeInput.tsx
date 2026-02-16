import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";
import type { TimeInputProps } from "./input.types";

/**
 * Компонент ввода времени с маской
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value = "", onValueChange = () => {}, label, ...rest }, ref) => {
    return (
      <MaskedInput
        {...rest}
        ref={ref}
        mask={"99:99"}
        value={value}
        onValueChange={onValueChange}
        label={label || "Время"}
      />
    );
  }
);

export default TimeInput;
