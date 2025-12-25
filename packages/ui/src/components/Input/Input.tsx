import { forwardRef, useMemo, useState } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./input.less";
import { IInputProps } from "./input.types";
import { Typography } from "../Typography";
import {
  IconWarningCircle24Fill,
  IconLock16Fill,
  IconCross24Outline,
  IconCopy24Fill,
} from "../../assets/icons";
import { useMaskedInput } from "./useMaskedInput";

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      label,
      error,
      description,
      disabled,
      value = "",
      onClearField,
      required,

      mask,
      validator,
      validateOn = "blur",
      returnMasked,

      onValueChange,

      onBlur,
      onChange,

      ...rest
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [blurred, setBlurred] = useState(false);

    const {
      inputRef,
      hasMask,
      maskedValue,
      rawValue,
      isComplete,
      onChangeMasked,
      onKeyDown,
      clear,
      visualTokens,
    } = useMaskedInput({
      mask,
      value: String(value ?? ""),
      onValueChange: (v) => {
        onValueChange?.(v);
      },
      disabled,
      readOnly: rest.readOnly,
      returnMasked,
      placeholders: { digit: "0", letter: "X", any: "•" },
    });

    const rawForValidation = hasMask ? rawValue : String(value ?? "");
    const maskedForValidation = hasMask ? maskedValue : String(value ?? "");
    const completeForValidation = hasMask ? isComplete : true;

    const validationError = useMemo(() => {
      if (!validator) return null;

      const show =
        validateOn === "change" ||
        (validateOn === "blur" && blurred) ||
        (validateOn === "touched" && touched);

      if (!show) return null;

      return validator({
        raw: rawForValidation,
        masked: maskedForValidation,
        isComplete: completeForValidation,
      });
    }, [
      validator,
      validateOn,
      blurred,
      touched,
      rawForValidation,
      maskedForValidation,
      completeForValidation,
    ]);

    const finalError = error ?? validationError ?? "";
    const hasError = !!finalError;

    const showErrorIcon = !disabled && hasError;
    const showCopyBtn = !showErrorIcon && disabled && !!value;

    // показываем clear:
    // - если есть маска: чистим через clear()
    // - если нет маски: через onClearField
    const canClear = !showErrorIcon && !disabled && !!value;
    const showClearBtn = canClear && (hasMask || !!onClearField);

    const caption = finalError || description;

    const handleCopyTextToClipboard = async () => {
      await navigator.clipboard.writeText(String(value ?? ""));
    };

    const inputClassName = classNames(
      component("input")({ error: hasError }),
      className
    );

    const labelClassName = component("input", "label")({
      error: hasError,
      required: required && !disabled,
    });

    const captionClassName = component("input", "label")({ error: hasError });

    const inputIconClassName = component("input", "icon")({ error: hasError });

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setBlurred(true);
      onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setTouched(true);
      onChange?.(e);
      // Если вы хотите поддерживать controlled через onValueChange и без mask:
      onValueChange?.(e.target.value);
    };

    const handleClear = () => {
      if (hasMask) {
        clear();
      } else {
        onClearField?.();
      }
    };

    return (
      <label className={inputClassName}>
        <Typography.Paragraph tag="P4 REGULAR" as="span" className={labelClassName}>
          {label}
          {!required && disabled && <IconLock16Fill />}
        </Typography.Paragraph>

        <div className={component("input", "field-container")()}>
          <input
            className={component("input", "field")()}
            ref={(node) => {
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as any).current = node;
              inputRef.current = node;
            }}
            value={hasMask ? maskedValue : value}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={hasMask ? onChangeMasked : handleChange}
            onKeyDown={hasMask ? onKeyDown : rest.onKeyDown}
            placeholder={hasMask ? mask : rest.placeholder}
            {...rest}
          />

          {hasMask && visualTokens && (
            <span className={component("input", "mask-overlay")()} aria-hidden>
              {visualTokens.map((t, i) => (
                <span
                  key={i}
                  className={classNames(
                    "cinput__mask-char",
                    t.filled && "cinput__mask-char--filled",
                    !t.filled && "cinput__mask-char--rest"
                  )}
                >
                  {t.char}
                </span>
              ))}
            </span>
          )}

          {showErrorIcon && (
            <span className={inputIconClassName}>
              <IconWarningCircle24Fill />
            </span>
          )}

          {showCopyBtn && (
            <button
              onClick={handleCopyTextToClipboard}
              className={inputIconClassName}
              type="button"
            >
              <IconCopy24Fill />
            </button>
          )}

          {showClearBtn && (
            <button onClick={handleClear} className={inputIconClassName} type="button">
              <IconCross24Outline />
            </button>
          )}
        </div>

        {caption && (
          <Typography.Caption tag="C1 REGULAR" className={captionClassName}>
            {caption}
          </Typography.Caption>
        )}
      </label>
    );
  }
);
