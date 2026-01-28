import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  MouseEvent,
} from "react";
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
import { IconButton } from "../IconButton";

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      label,
      error,
      description,
      disabled,
      value,
      onClearField,
      required,
      id,
      fieldOverlay,
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const inputId = id ?? defaultId;

    const isError = !!error;

    const showErrorIcon = !disabled && isError;
    const showCopyBtn = disabled && !!value && !showErrorIcon;
    const showClearBtn =
      !disabled && !!value && !!onClearField && !showErrorIcon;

    const caption = error || description;

    const captionId = caption ? `${inputId}-caption` : undefined;

    const handleClearFieldClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClearField?.(event);
      inputRef.current?.focus();
    };

    const handleCopyTextToClipboard = async () => {
      try {
        await navigator.clipboard?.writeText?.(value);
      } catch {}
    };

    const inputClassName = classNames(
      component("input")({ error: isError }),
      className,
    );

    const labelClassName = component(
      "input",
      "label",
    )({ required: required && !disabled });

    const fieldContainerClassName = component("input", "field-container")();

    const fieldClassName = component("input", "field")();

    const errorIconClassName = component("input", "error-icon")();

    const disabledIconClassName = component("input", "disabled-icon")();

    const actionIconClassName = component("input", "action-icon")();

    const captionClassName = component("input", "caption")();

    return (
      <div className={inputClassName}>
        <label htmlFor={inputId}>
          <Typography.Paragraph tag="P4 REGULAR" className={labelClassName}>
            {label}
            {disabled && (
              <span aria-hidden="true" className={disabledIconClassName}>
                <IconLock16Fill />
              </span>
            )}
          </Typography.Paragraph>
        </label>

        <div className={fieldContainerClassName}>
          {fieldOverlay}
          <input
            className={fieldClassName}
            ref={inputRef}
            id={inputId}
            value={value}
            disabled={disabled}
            required={required}
            aria-invalid={isError || undefined}
            aria-describedby={captionId}
            {...rest}
          />
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
              variant="transparent"
              size="s"
              ariaLabel="Копировать значение поля"
              title="Копировать"
            />
          )}
          {showClearBtn && (
            <IconButton
              // Чтобы кнопка “Очистить” не уводила фокус
              onMouseDown={(e) => e.preventDefault()}
              className={actionIconClassName}
              onClick={handleClearFieldClick}
              icon={<IconCross24Outline />}
              variant="transparent"
              size="s"
              ariaLabel="Очистить значение поля"
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
  },
);
