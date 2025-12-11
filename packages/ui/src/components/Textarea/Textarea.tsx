import { FocusEvent, forwardRef, useState } from "react";
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
      value = "",
      resize = false,
      size = "m",
      maxSymbols = 0,
      description = "",
      error = "",
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const defaultDescription =
      description || (maxSymbols ? `Не более ${maxSymbols} символов` : "");

    const symbolsCount = `${value.length} / ${maxSymbols}`;

    const caption =
      error || (isFocused && maxSymbols ? symbolsCount : defaultDescription);

    const lengthError = maxSymbols ? value.length > maxSymbols : false;

    const isError = !!error || lengthError;

    const handleTextareaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const textareaClassName = classNames(component("textarea")(), className);

    const labelClassName = component(
      "textarea",
      "label"
    )({ error: isError, required: required && !disabled });

    const fieldClassName = component(
      "textarea",
      "field"
    )({ resize: resize, [`size-${size}`]: true });

    const captionClassName = component(
      "textarea",
      "caption"
    )({ error: isError });

    return (
      <label className={textareaClassName}>
        <Typography.Paragraph
          tag="P4 REGULAR"
          as="span"
          className={labelClassName}
        >
          {label}
          {!required && disabled && <IconLock16Fill />}
        </Typography.Paragraph>
        <textarea
          className={fieldClassName}
          ref={ref}
          value={value}
          disabled={disabled}
          required={required}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          {...rest}
        />
        {caption && (
          <Typography.Caption tag="C1 REGULAR" className={captionClassName}>
            {caption}
          </Typography.Caption>
        )}
      </label>
    );
  }
);
