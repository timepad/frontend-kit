import React from "react";

export type LinkSizeType = 's' | 'm' | 'l';
export type IconPositionType = 'left' | 'right';

export type ILinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  to: string;
  size?: LinkSizeType;
  icon?: React.ReactNode;
  iconPosition?: IconPositionType;
  onClick?: (to: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export interface ILinkLabelProps {
  size: LinkSizeType;
  children: React.ReactNode;
}
