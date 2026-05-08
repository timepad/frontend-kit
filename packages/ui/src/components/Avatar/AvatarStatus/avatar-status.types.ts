import React, {MouseEventHandler} from "react";

export type AvatarStatusSize = "s" | "m" | "l";
export type AvatarAppearance = "accent" | "custom";

export interface IAvatarStatusProps {
  size?: AvatarStatusSize;
  appearance?: AvatarAppearance;
  color?: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  onClick?: MouseEventHandler;
  className?: string;
}
