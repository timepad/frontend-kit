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
  const showText = !indicator && size !== "xs";
  const displayText = indicator  ? "" : formatCounterText(normalizeNumber(value!));
  const visualSize: CounterSize = indicator ? "xs" : size;
  const { ValueComponent, valueTag } = showText ? valueCounter[size] : { ValueComponent: null, valueTag: null };


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
          {showText && ValueComponent && (
              <ValueComponent tag={valueTag} className={textClassName}>
                  {displayText}
              </ValueComponent>
          )}
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
      ValueComponent: ComponentType<any>;
      valueTag:
      | Extract<ParagraphVariantTag, "P4 SEMIBOLD">
      | Extract<CaptionVariantTag, "C1 SEMIBOLD">;
  }
> = {
  s: { ValueComponent: Typography.Caption, valueTag: "C1 SEMIBOLD" },
  m: { ValueComponent: Typography.Paragraph, valueTag: "P4 SEMIBOLD"},
};
