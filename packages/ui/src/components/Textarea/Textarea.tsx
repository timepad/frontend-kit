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

    const defaultId = useId();

    const textareaId = id ?? defaultId;

    const valueLength = value.length;

    const caption = error || description;

    const lengthError = maxSymbols ? valueLength > maxSymbols : false;

    const isError = !!error || lengthError;

    const captionId = caption ? `${textareaId}-caption` : undefined;

    const handleTextareaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(event);
      if (!!maxSymbols) setIsFocused(true);
    };

    const handleTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(event);
      if (!!maxSymbols) setIsFocused(false);
    };

    const textareaClassName = classNames(component("textarea")(), className);

    const labelClassName = component(
      "textarea",
      "label"
    )({ error: isError, required: required });

    const fieldClassName = component(
      "textarea",
      "field"
    )({ resize: resize, [`size-${size}`]: true });

    const captionClassName = component(
      "textarea",
      "caption"
    )({ error: !!error });

    const symbolsCountClassName = component(
      "textarea",
      "caption"
    )({ error: lengthError });

    return (
      <div className={textareaClassName}>
        <label htmlFor={textareaId}>
          <Typography.Paragraph tag="P4 REGULAR" className={labelClassName}>
            {label}
            {disabled && <IconLock16Fill />}
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
        {maxSymbols > 0 && (
          <Typography.Caption
            tag="C1 REGULAR"
            className={symbolsCountClassName}
          >
            {isFocused || valueLength > 0
              ? `${valueLength} / ${maxSymbols}`
              : `Не более ${maxSymbols} символов`}
          </Typography.Caption>
        )}
      </div>
    );
  }
);
