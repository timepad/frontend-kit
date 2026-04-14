import React from "react";

export type LinkSizeType = 's' | 'm' | 'l';
export type IconPositionType = 'left' | 'right';

export interface ILinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  external?: boolean;
  navigate?: (to: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
  size?: LinkSizeType;
  icon?: React.ReactNode;
  iconPosition?: IconPositionType;
  className?: string;
}

export interface ILinkTextProps {
  size: LinkSizeType;
  children: React.ReactNode;
}
