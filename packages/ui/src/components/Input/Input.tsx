import { forwardRef, useId } from "react";
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
      ...rest
    },
    ref
  ) => {
    const defaultId = useId();

    const inputId = id ?? defaultId;

    const hasError = !!error;
    const hasValue = !!value;

    const showErrorIcon = !disabled && hasError;
    const showCopyBtn = disabled && hasValue && !showErrorIcon;
    const showClearBtn =
      !disabled && hasValue && !!onClearField && !showErrorIcon;

    const caption = error || description;

    const captionId = caption ? `${inputId}-caption` : undefined;

    const handleCopyTextToClipboard = async () => {
      try {
        await navigator.clipboard?.writeText?.(value);
      } catch {}
    };

    const inputClassName = classNames(component("input")(), className);

    const labelClassName = component(
      "input",
      "label"
    )({ error: hasError, required: required });

    const fieldContainerClassName = component("input", "field-container")();

    const fieldClassName = component("input", "field")();

    const errorIconClassName = component("input", "error-icon")();

    const actionIconClassName = component("input", "action-icon")();

    const captionClassName = component("input", "caption")({ error: hasError });

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
            ref={ref}
            id={inputId}
            value={value}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
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
