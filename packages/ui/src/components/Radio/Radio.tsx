import { FC, forwardRef, useId, PropsWithChildren } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./radio.less";
import { IRadioProps, RadioSize } from "./radio.types";
import { Typography } from "../Typography";
import type { ParagraphVariantTag } from "../Typography/configs";

const LABEL_TAG: Record<RadioSize, ParagraphVariantTag> = {
  s: "P4 REGULAR",
  m: "P3 REGULAR",
  l: "P1 REGULAR",
};

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
  size: RadioSize;
  id?: string;
}

const Description: FC<PropsWithChildren<IDescriptionProps>> = ({
  size,
  id,
  children,
}) => {
  const className = component("radio", "description")();
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
