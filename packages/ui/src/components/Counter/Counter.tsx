import { type ComponentType, type CSSProperties, FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./counter.less";
import { CounterSize, CounterSM, ICounterProps } from "./counter.types";
import { CaptionVariantTag, ParagraphVariantTag, Typography } from "../Typography";

export const Counter: FC<ICounterProps> = ({
  size = "m",
  appearance = "accent",
  className,
  value,
  color,
  style,
  ...rest
}) => {
  const indicator = isIndicatorOnly(size, value);
  const displayText = indicator  ? "" : formatCounterText(normalizeNumber(value!));
  const visualSize: CounterSize = indicator ? "xs" : size;

  const content = () => {
      if (indicator) return null;
      const { Component, tag } = valueCounter[size as CounterSM];

      return (
          <Component tag={tag} className={textClassName}>
              {displayText}
          </Component>
      )
  }

  const rootClassName = classNames(
      component("counter")({
          [`size-${visualSize}`]: true,
          "appearance-custom": appearance === "custom",
          "shape-circle": displayText.length === 1,
      }),
      className,
  );

  const textClassName = component("counter", "text")();
  const customBg = appearance === "custom" ? ({ "--counter-bg": color } as CSSProperties) : {};

  return (
      <span className={rootClassName} style={{ ...customBg, ...style }} {...rest}>
          {content()}
      </span>
  );
};

const formatCounterText = (value: number): string => {
    if (value > 99) return "99+";
    return String(value);
};

const normalizeNumber = (value: number): number => {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.round(value));
};

const isIndicatorOnly = (size: CounterSize, value?: number): boolean => {
    return size === "xs" || value === undefined;
};

const valueCounter: Record<
  CounterSM,
  {
      Component: ComponentType<any>;
      tag:
      | Extract<ParagraphVariantTag, "P4 SEMIBOLD">
      | Extract<CaptionVariantTag, "C1 SEMIBOLD">;
  }
> = {
  s: { Component: Typography.Caption, tag: "C1 SEMIBOLD" },
  m: { Component: Typography.Paragraph, tag: "P4 SEMIBOLD"},
};
