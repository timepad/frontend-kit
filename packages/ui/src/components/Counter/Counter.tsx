import {type CSSProperties, FC} from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./counter.less";
import type { CounterSize, ICounterProps } from "./counter.types";
import { Typography } from "../Typography";

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

export const Counter: FC <ICounterProps>= (props) => {
    const {
        size = "m",
        appearance = "accent",
        className,
        style,
        ...rest
    } = props;
    const value = "value" in props ? props.value : undefined;
    const color = "color" in props ? props.color : undefined;

    const indicator = isIndicatorOnly(size, value);
    const displayText = indicator || value === undefined
        ? ""
        : formatCounterText(normalizeNumber(value));

    const visualSize: CounterSize = indicator ? "xs" : size;
    const isCircle = !indicator && displayText.length === 1;

    const rootClassName = classNames(
        component("counter")({
            [`size-${visualSize}`]: true,
            "appearance-accent": appearance === "accent",
            "appearance-custom": appearance === "custom",
            "shape-circle": !indicator && isCircle,
        }),
        className,
    );

    const textClassName = component("counter", "text")();
    const customBg = appearance === "custom" ? ({ "--counter-bg": color } as CSSProperties) : undefined;
    const mergedStyle = customBg ? { ...customBg, ...style } : style;

    return (
        <span className={rootClassName} style={mergedStyle} {...rest}>
            {!indicator && (size === "s" ? (
                    <Typography.Caption as="span" tag="C1 SEMIBOLD" className={textClassName}>
                        {displayText}
                    </Typography.Caption>
                ) : (
                    <Typography.Paragraph as="span" tag="P4 SEMIBOLD" className={textClassName}>
                        {displayText}
                    </Typography.Paragraph>
            ))}
        </span>
    );
};
