import { forwardRef, useMemo, useState, useId } from "react";
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
import { IconButton } from "../IconButton";

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

      id,
      ...rest
    },
    ref
  ) => {
    const defaultId = useId();

    const inputId = id ?? defaultId;

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
    const hasValue = !!value;

    const showErrorIcon = !disabled && hasError;
    const showCopyBtn = disabled && hasValue && !showErrorIcon;

    // показываем clear:
    // - если есть маска: чистим через clear()
    // - если нет маски: через onClearField
    const canClear = !disabled && hasValue;
    const showClearBtn = canClear && (hasMask || !!onClearField) && !showErrorIcon;

    const caption = finalError || description;

    const captionId = caption ? `${inputId}-caption` : undefined;

    const handleCopyTextToClipboard = async () => {
      try {
        await navigator.clipboard?.writeText?.(value);
      } catch {}
    };

    const inputClassName = classNames(component("input")(), className);

    const labelClassName = component("input", "label")({
      error: hasError,
      required: required && !disabled,
    });
    const labelClassName = component(
      "input",
      "label"
    )({ error: hasError, required: required });

    const fieldContainerClassName = component("input", "field-container")();

    const fieldClassName = component("input", "field")();

    const errorIconClassName = component("input", "error-icon")();

    const actionIconClassName = component("input", "action-icon")();

    const captionClassName = component("input", "caption")({ error: hasError });

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
      <div className={inputClassName}>
        <label htmlFor={inputId}>
          <Typography.Paragraph tag="P4 REGULAR" className={labelClassName}>
            {label}
            {disabled && <IconLock16Fill />}
          </Typography.Paragraph>
        </label>

        <div className={fieldContainerClassName}>
          <input
            className={fieldClassName}
            ref={(node) => {
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as any).current = node;
              inputRef.current = node;
            }}
            id={inputId}
            value={hasMask ? maskedValue : value}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={hasMask ? onChangeMasked : handleChange}
            onKeyDown={hasMask ? onKeyDown : rest.onKeyDown}
            placeholder={hasMask ? mask : rest.placeholder}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={captionId}
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
            <span className={errorIconClassName} aria-hidden="true">
              <IconWarningCircle24Fill />
            </span>
          )}
          {showCopyBtn && (
            <IconButton
              className={actionIconClassName}
              onClick={handleCopyTextToClipboard}
              icon={<IconCopy24Fill />}
              type="button"
              variant="transparent"
              size="s"
              aria-label="Copy"
              title="Копировать"
            />
          )}

          {showClearBtn && (
            <IconButton
              className={actionIconClassName}
              onClick={onClearField}
              icon={<IconCross24Outline />}
              variant="transparent"
              size="s"
              aria-label="Clear"
              title="Очистить"
            />
          )}
        </div>

        {caption && (
          <Typography.Caption
            tag="C1 REGULAR"
            className={captionClassName}
            id={captionId}
          >
            {caption}
          </Typography.Caption>
        )}
      </div>
    );
  }
);
