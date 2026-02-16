import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";

type TimeRangeInputProps = Omit<
  React.ComponentProps<typeof MaskedInput>,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение диапазона времени в формате "HHMM-HHMM" (RAW value) */
  value: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange: (value: string) => void;
  
  label?: string;
};

/**
 * Компонент ввода временного диапазона (например, "09:00-18:00")
 * Использует маску для форматирования ввода
 */
export const TimeRangeInput = forwardRef<HTMLInputElement, TimeRangeInputProps>(
  ({ value, onValueChange, label, ...rest }, ref) => {
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