import { forwardRef, useId, type ComponentType } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./radio.less";
import { IRadioProps, RadioSize } from "./radio.types";
import {
  CaptionVariantTag,
  ParagraphVariantTag,
  Typography,
} from "../Typography";

export const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  (
    {
      className,
      label,
      id,
      description,
      isError,
      extraLabel,
      size = "m",
      ...rest
    },
    ref,
  ) => {
    const defaultId = useId();

    const radioId = id ?? defaultId;
    const descriptionId = description ? `${radioId}-description` : undefined;

    const { DescriptionComponent, descriptionTag } =
      descriptionTypography[size];

    const radioClassName = classNames(
      component("radio")({ [`size-${size}`]: true }),
      className,
    );

    const labelClassName = component(
      "radio",
      "label",
    )({ [`size-${size}`]: true });

    const fieldClassName = component(
      "radio",
      "field",
    )({ [`size-${size}`]: true, error: isError });

    const descriptionClassName = component("radio", "description")();

    return (
      <label className={radioClassName}>
        <input
          className={fieldClassName}
          type="radio"
          ref={ref}
          id={radioId}
          aria-invalid={isError || undefined}
          aria-describedby={descriptionId}
          {...rest}
        />
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

const labelTag: Record<
  RadioSize,
  Extract<ParagraphVariantTag, "P4 REGULAR" | "P3 REGULAR" | "P1 REGULAR">
> = {
  s: "P4 REGULAR",
  m: "P3 REGULAR",
  l: "P1 REGULAR",
};

const descriptionTypography: Record<
  RadioSize,
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
