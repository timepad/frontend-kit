import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export type AvatarStatusSize = "s" | "m" | "l";
export type AvatarAppearance = "accent" | "custom";

export interface IAvatarStatusBaseProps {
  size?: AvatarStatusSize;
  appearance?: AvatarAppearance;
  color?: string;
}

export interface IAvatarStatusSpanProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span";
}

export interface IAvatarStatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as: "button";
}

export type IAvatarStatusProps = IAvatarStatusBaseProps &
  (IAvatarStatusSpanProps | IAvatarStatusButtonProps);
