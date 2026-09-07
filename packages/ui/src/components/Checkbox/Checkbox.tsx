import { forwardRef, useId, ComponentType } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { IconCheck16Outline, IconMinus16Outline } from "../../assets/icons";

import "./checkbox.less";
import { ICheckboxProps, CheckboxSize } from "./checkbox.types";
import {
  Typography,
  ParagraphVariantTag,
  CaptionVariantTag,
} from "../Typography";

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
      checked,
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();

    const checkboxId = id ?? defaultId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const { DescriptionComponent, descriptionTag } =
      descriptionTypography[size];

    const icon = indeterminate ? (
      <IconMinus16Outline />
    ) : (
      <IconCheck16Outline />
    );

    const checkboxClassName = classNames(
      component("checkbox")({ [`size-${size}`]: true }),
      className,
    );

    const labelClassName = component(
      "checkbox",
      "label",
    )({ [`size-${size}`]: true });

    const controlClassName = component("checkbox", "control")();
    const descriptionClassName = component("checkbox", "description")();

    const fieldClassName = component(
      "checkbox",
      "field",
    )({ [`size-${size}`]: true, error: isError, indeterminate: indeterminate });
    const iconClassName = component(
      "checkbox",
      "icon",
    )({
      visible: checked || indeterminate,
    });

    return (
      <label className={checkboxClassName}>
        <span className={controlClassName}>
          <input
            className={fieldClassName}
            type="checkbox"
            ref={ref}
            id={checkboxId}
            aria-invalid={isError || undefined}
            aria-checked={indeterminate ? "mixed" : checked}
            aria-describedby={descriptionId}
            checked={checked}
            {...rest}
          />
          <span className={iconClassName}>{icon}</span>
        </span>
        <div>
          <div className={labelClassName}>
            <Typography.Paragraph tag={labelTag[size]}>
              {label}
            </Typography.Paragraph>
            {extraLabel && (
              <Typography.Paragraph tag={labelTag[size]}>
                {extraLabel}
              </Typography.Paragraph>
            )}
          </div>
          {description && (
            <DescriptionComponent
              tag={descriptionTag}
              className={descriptionClassName}
              id={descriptionId}
            >
              {description}
            </DescriptionComponent>
          )}
        </div>
      </label>
    );
  },
);

const labelTag: Record<CheckboxSize, ParagraphVariantTag> = {
  s: "P4 REGULAR",
  m: "P3 REGULAR",
  l: "P1 REGULAR",
};

const descriptionTypography: Record<
  CheckboxSize,
  {
    DescriptionComponent: ComponentType<any>;
    descriptionTag:
      | Extract<ParagraphVariantTag, "P4 REGULAR" | "P2 REGULAR">
      | Extract<CaptionVariantTag, "C1 REGULAR">;
  }
> = {
  s: { DescriptionComponent: Typography.Caption, descriptionTag: "C1 REGULAR" },
  m: {
    DescriptionComponent: Typography.Paragraph,
    descriptionTag: "P4 REGULAR",
  },
  l: {
    DescriptionComponent: Typography.Paragraph,
    descriptionTag: "P2 REGULAR",
  },
};
