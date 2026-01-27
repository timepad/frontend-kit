import { FocusEvent, forwardRef, useId, useState } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./textarea.less";
import { ITextareaProps } from "./textarea.types";
import { Typography } from "../Typography";
import { IconLock16Fill } from "../../assets/icons";

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      className,
      label,
      disabled,
      onFocus,
      onBlur,
      required,
      id,
      value,
      resize = false,
      size = "m",
      maxSymbols = 0,
      description = "",
      error = "",
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const defaultId = useId();

    const textareaId = id ?? defaultId;

    const valueLength = value.length;

    const isMaxSymbols = !!maxSymbols;

    const maxSymbolsText =
      isFocused || valueLength > 0
        ? `${valueLength} / ${maxSymbols}`
        : `Не более ${maxSymbols} символов`;

    const counter = isMaxSymbols ? maxSymbolsText : "";

    const caption = error || description || counter;

    const lengthError = isMaxSymbols ? valueLength > maxSymbols : false;

    const isError = !!error || lengthError;

    const captionId = caption ? `${textareaId}-caption` : undefined;

    const handleTextareaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (isMaxSymbols) setIsFocused(true);
      onFocus?.(event);
    };

    const handleTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (isMaxSymbols) setIsFocused(false);
      onBlur?.(event);
    };

    const textareaClassName = classNames(
      component("textarea")({ error: isError }),
      className,
    );

    const labelClassName = component(
      "textarea",
      "label",
    )({ required: required && !disabled });

    const fieldClassName = component(
      "textarea",
      "field",
    )({ resize: resize, [`size-${size}`]: true });

    const disabledIconClassName = component("textarea", "disabled-icon")();

    const captionClassName = component("textarea", "caption")();

    return (
      <div className={textareaClassName}>
        <label htmlFor={textareaId}>
          <Typography.Paragraph tag="P4 REGULAR" className={labelClassName}>
            {label}
            {disabled && (
              <span aria-hidden="true" className={disabledIconClassName}>
                <IconLock16Fill />
              </span>
            )}
          </Typography.Paragraph>
        </label>
        <textarea
          id={textareaId}
          className={fieldClassName}
          ref={ref}
          value={value}
          disabled={disabled}
          required={required}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          aria-invalid={isError || undefined}
          aria-describedby={captionId}
          {...rest}
        />
        {caption && (
          <Typography.Caption
            id={captionId}
            tag="C1 REGULAR"
            className={captionClassName}
          >
            {caption}
          </Typography.Caption>
        )}
      </div>
    );
  },
);
