import React, {HTMLAttributes, MouseEventHandler} from "react";

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;

export interface IAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string; // Имя-Фамилия
  initials?: string; // Название организации
  size?: AvatarSize;
  stroke?: boolean;
  withStatus?: boolean;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  src?: string;
  onClick?: MouseEventHandler;
  avatarStatusClassName?: string;
}

export interface IAvatarInitialsProps {
  initials: string;
}

export interface IAvatarImageProps {
  src: string;
  stroke?: boolean;
}