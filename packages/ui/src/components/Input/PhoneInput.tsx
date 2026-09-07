import { forwardRef } from "react";
import { MaskedInput } from "../MaskedInput";
import type { PhoneInputProps, PhoneMaskType } from "./input.types";

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
  ({ value = "", onValueChange = () => {}, phoneMaskType = "RU", mask, ...rest }, ref) => {
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
