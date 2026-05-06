import { HTMLAttributes } from "react";

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;

export interface IAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  square?: boolean;
  bordered?: boolean;
  withStatus?: boolean;
}

export interface IAvatarInitialsProps {
  initials: string;
}

export interface IAvatarImageProps {
  src: string;
}