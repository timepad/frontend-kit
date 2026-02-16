import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof MaskedInput>,
  "mask" | "value" | "onValueChange"
> & {
  /** Значение телефона в формате +7XXXXXXXXXX (RAW value) */
  value: string;

  /** Обработчик изменения значения (возвращает RAW value) */
  onValueChange: (value: string) => void;

  /** Маска для телефона (по умолчанию +7 XXX XXX-XX-XX) */
  mask?: string;

  /** Предустановленный тип маски */
  phoneMaskType?: PhoneMaskType;
};

/** Типы поддерживаемых телефонных масок */
export type PhoneMaskType =
  | "RU"; // +7 XXX XXX-XX-XX

/** Словарь предустановленных масок */
const PHONE_MASKS: Record<PhoneMaskType, string> = {
  "RU": "+7 999 999-99-99"
};

/**
 * Возвращает маску телефона по типу
 */
export const getPhoneMask = (type: PhoneMaskType = "RU"): string => {
  return PHONE_MASKS[type] || PHONE_MASKS["RU"];
};

/**
 * Компонент ввода телефона с маской
 * По умолчанию использует маску "+7 XXX XXX-XX-XX" для российских номеров
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onValueChange, phoneMaskType = "RU", mask, ...rest }, ref) => {
    const finalMask = mask || getPhoneMask(phoneMaskType);
    
    return (
      <MaskedInput
        {...rest}
        ref={ref}
        mask={finalMask}
        value={value}
        onValueChange={onValueChange}
      />
    );
  }
);

export default PhoneInput;