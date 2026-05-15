import type { HTMLAttributes } from "react";

export type CounterSize = "xs" | "s" | "m";

export type CounterAppearance = "accent" | "custom";

interface IBaseCounterProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {}

interface IXSAccentCounterProps extends IBaseCounterProps {
  size: "xs";
  appearance?: "accent";
}

interface IXSCustomCounterProps extends IBaseCounterProps {
  size: "xs";
  appearance: "custom";
  color: string;
}

interface ISMAccentCounterProps extends IBaseCounterProps {
  size?: "s" | "m";
  appearance?: "accent";
  value?: number;
}

interface ISMCustomCounterProps extends IBaseCounterProps {
  size?: "s" | "m";
  appearance: "custom";
  color: string;
  value?: number;
}

export type ICounterProps =
  | IXSAccentCounterProps
  | IXSCustomCounterProps
  | ISMAccentCounterProps
  | ISMCustomCounterProps;
