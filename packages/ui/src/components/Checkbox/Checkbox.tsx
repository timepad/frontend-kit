import { FC, forwardRef, useId, PropsWithChildren } from "react";
import { classNames, component } from "@frontend-kit/utils";
import {
  IconCheck16Outline,
  IconMinus16Outline,
} from "../../assets/icons";

import "./checkbox.less";
import { ICheckboxProps, CheckboxSize } from "./checkbox.types";
import { Typography } from "../Typography";
import type { ParagraphVariantTag } from "../Typography/configs";

const LABEL_TAG: Record<CheckboxSize, ParagraphVariantTag> = {
  s: "P4 REGULAR",
  m: "P3 REGULAR",
  l: "P1 REGULAR",
};

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (
    {
      className,
      label,
      id,
      description,
      isError,
      extraLabel,
      size = "m",
      indeterminate = false,
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();

    const checkboxId = id ?? defaultId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const { checked, ...inputProps } = rest;

    const isChecked = !!checked;
    const isIndeterminate = !!indeterminate && isChecked;
    const icon = isIndeterminate ? <IconMinus16Outline /> : <IconCheck16Outline />;

    const checkboxClassName = classNames(
      component("checkbox")({ [`size-${size}`]: true }),
      className,
    );

    const labelClassName = component(
      "checkbox",
      "label",
    )({ [`size-${size}`]: true });

    const fieldClassName = component(
      "checkbox",
      "field",
    )({ [`size-${size}`]: true, error: isError, indeterminate: isIndeterminate });
    const iconClassName = component("checkbox", "icon")({
      visible: isChecked || isIndeterminate,
    });

    return (
      <label className={checkboxClassName}>
        <span className={component("checkbox", "control")()}>
          <input
            className={fieldClassName}
            type="checkbox"
            ref={ref}
            id={checkboxId}
            aria-invalid={isError || undefined}
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            aria-describedby={descriptionId}
            checked={isChecked}
            {...inputProps}
          />
          <span className={iconClassName}>{icon}</span>
        </span>
        <div>
          <div className={labelClassName}>
            <Typography.Paragraph tag={LABEL_TAG[size]}>
              {label}
            </Typography.Paragraph>
            {extraLabel && (
              <Typography.Paragraph tag={LABEL_TAG[size]}>
                {extraLabel}
              </Typography.Paragraph>
            )}
          </div>
          {description && (
            <Description size={size} id={descriptionId}>
              {description}
            </Description>
          )}
        </div>
      </label>
    );
  },
);

interface IDescriptionProps {
  size: CheckboxSize;
  id?: string;
}

const Description: FC<PropsWithChildren<IDescriptionProps>> = ({
  size,
  id,
  children,
}) => {
  const className = component("checkbox", "description")();
  const typographyProps = { className, id };

  if (size === "s")
    return (
      <Typography.Caption tag="C1 REGULAR" {...typographyProps}>
        {children}
      </Typography.Caption>
    );

  if (size === "m")
    return (
      <Typography.Paragraph tag="P4 REGULAR" {...typographyProps}>
        {children}
      </Typography.Paragraph>
    );

  return (
    <Typography.Paragraph tag="P2 REGULAR" {...typographyProps}>
      {children}
    </Typography.Paragraph>
  );
};
