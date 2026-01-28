import { forwardRef } from "react";
import { classNames, component } from "@frontend-kit/utils";

import { Input } from "../Input/Input";
import type { IInputProps } from "../Input/input.types";
import { useMaskedInput } from "../../../../hooks/src/useMaskedInput/useMaskedInput";

type MaskedInputProps = Omit<
  IInputProps,
  | "value"
  | "placeholder"
  | "fieldOverlay"
  | "onChange"
  | "onPaste"
  | "onBeforeInput"
> & {
  /** Маска, например "+7 (999) 999-99-99" или "9999 9999 9999 9999" */
  mask: string;

  /** RAW value по умолчанию */
  value: string;

  /** change отдаёт RAW value (или masked, если returnMasked=true) */
  onValueChange: (value: string) => void;

  /** Кастомные плейсхолдеры (только для overlay) */
  placeholders?: Parameters<typeof useMaskedInput>[0]["placeholders"];

  /** Если нужно наружу отдавать masked (редко) */
  returnMasked?: boolean;

  /** Режим ввода символов с клавиатуры */
  inputMode?: Parameters<typeof useMaskedInput>[0]["inputMode"];

  /** Режим вставки */
  pasteMode?: Parameters<typeof useMaskedInput>[0]["pasteMode"];

  /** Детектор режима для smart paste */
  smartPasteDetector?: Parameters<typeof useMaskedInput>[0]["smartPasteDetector"];
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      mask,
      value,
      onValueChange,
      placeholders,
      returnMasked,

      inputMode,
      pasteMode,
      smartPasteDetector,

      onClearField,
      disabled,
      readOnly,
      className,

      onFocus,
      onClick,
      onKeyDown: onKeyDownOuter,

      ...rest
    },
    ref
  ) => {
    const {
      inputRef,
      maskedValue,
      visualTokens,

      onFocusMasked,
      onClickMasked,

      onKeyDown,
      onBeforeInput,
      onPaste,
      onChangeMasked,

      clear,
      maskedMaxLength,
    } = useMaskedInput({
      mask,
      value,
      onValueChange,
      disabled,
      readOnly,
      placeholders,
      returnMasked,

      inputMode,
      pasteMode,
      smartPasteDetector,
    });

    const overlay = (
      <span className={component("input", "mask-overlay")()} aria-hidden="true">
        {visualTokens.map((t, i) => (
          <span
            key={i}
            className={classNames(
              component("input", "mask-char")(),
              !t.filled && component("input", "mask-char")({ rest: true })
            )}
          >
            {t.char}
          </span>
        ))}
      </span>
    );

    return (
      <Input
        {...rest}
        className={className}
        value={maskedValue}
        disabled={disabled}
        readOnly={readOnly}
        fieldOverlay={overlay}

        placeholder={undefined}

        maxLength={maskedMaxLength}
        data-masked="true"

        onBeforeInput={onBeforeInput}
        onPaste={onPaste}
        onChange={onChangeMasked}
        onKeyDown={(e) => {
          onKeyDown(e);
          onKeyDownOuter?.(e);
        }}
        onFocus={(e) => {
          onFocusMasked(e);
          onFocus?.(e);
        }}
        onClick={(e) => {
          onClickMasked(e);
          onClick?.(e);
        }}
        onClearField={(e) => {
          clear();
          onClearField?.(e);
        }}
        ref={(node) => {
          // forwardRef наружу
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;

          // ref для маски
          inputRef.current = node;
        }}
      />
    );
  }
);
