import { InputHTMLAttributes } from "react";

export type SwitchSize = "m" | "l";

export interface ISwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SwitchSize;
}
