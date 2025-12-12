import { forwardRef } from "react";
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
      ...rest
    },
    ref
  ) => {
    const hasError = !!error;

    const showErrorIcon = !disabled && hasError;
    const showCopyBtn = !showErrorIcon && disabled && !!value;
    const showClearBtn =
      !showErrorIcon && !disabled && !!value && !!onClearField;

    const caption = error || description;

    const handleCopyTextToClipboard = async () => {
      await navigator.clipboard.writeText(value as string);
    };

    const inputClassName = classNames(
      component("input")({ error: hasError }),
      className
    );

    const labelClassName = component(
      "input",
      "label"
    )({ error: hasError, required: required && !disabled });

    const captionClassName = component("input", "label")({ error: hasError });

    const inputIconClassName = component("input", "icon")({ error: hasError });

    return (
      <label className={inputClassName}>
        <Typography.Paragraph
          tag="P4 REGULAR"
          as="span"
          className={labelClassName}
        >
          {label}
          {!required && disabled && <IconLock16Fill />}
        </Typography.Paragraph>

        <div className={component("input", "field-container")()}>
          <input
            className={component("input", "field")()}
            ref={ref}
            value={value}
            disabled={disabled}
            {...rest}
          />
          {showErrorIcon && (
            <span className={inputIconClassName}>
              <IconWarningCircle24Fill />
            </span>
          )}
          {/*TODO Заменить на IconButton */}
          {showCopyBtn && (
            <button
              onClick={handleCopyTextToClipboard}
              className={inputIconClassName}
            >
              <IconCopy24Fill />
            </button>
          )}
          {showClearBtn && (
            <button onClick={onClearField} className={inputIconClassName}>
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
