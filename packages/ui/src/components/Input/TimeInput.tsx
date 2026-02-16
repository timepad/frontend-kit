import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";

type TimeInputProps = Omit<
  React.ComponentProps<typeof MaskedInput>,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение времени в формате HHMM (RAW value) */
  value: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange: (value: string) => void;
  
  label?: string;
};

/**
 * Компонент ввода времени с маской
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value, onValueChange, label, ...rest }, ref) => {
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