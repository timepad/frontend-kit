import type { HTMLAttributes } from "react";

export type CounterSize = "xs" | "s" | "m";
export type CounterAppearance = "accent" | "custom";

type CounterXS = Extract<CounterSize, "xs">;
export type CounterSM = Extract<CounterSize, "s" | "m">;
type CounterAppearanceAccent = Extract<CounterAppearance, "accent">;
type CounterAppearanceCustom = Extract<CounterAppearance, "custom">;

interface IBaseCounterProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  size?: CounterSize;
  appearance?: CounterAppearance;
}

interface IXSAccentCounterProps extends IBaseCounterProps {
  size?: CounterXS;
  appearance?: CounterAppearanceAccent;
  value?: never;
  color?: never;
}

interface IXSCustomCounterProps extends IBaseCounterProps {
  size?: CounterXS;
  appearance: CounterAppearanceCustom;
  color: string;
  value?: never;
}

interface ISMAccentCounterProps extends IBaseCounterProps {
  size?: CounterSM;
  appearance?: CounterAppearanceAccent;
  color?: never;
  value?: number;
}

interface ISMCustomCounterProps extends IBaseCounterProps {
  size?: CounterSM;
  appearance: CounterAppearanceCustom;
  color: string;
  value?: number;
}

export type ICounterProps = IXSAccentCounterProps | IXSCustomCounterProps | ISMAccentCounterProps | ISMCustomCounterProps;
