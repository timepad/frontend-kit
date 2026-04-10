import React from "react";

export type LinkSizeType = 'S' | 'M' | 'L';
export type IconPositionType = 'left' | 'right';
export type LinkStateType = 'default' | 'hover';

export interface ILinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  external?: boolean;
  navigate?: (to: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  size?: LinkSizeType;
  icon?: React.ReactNode;
  iconPosition?: IconPositionType;
  state?: LinkStateType;
  className?: string;
}
