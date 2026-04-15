import React from "react";

export type LinkSizeType = 's' | 'm' | 'l';
export type IconPositionType = 'left' | 'right';

type BaseProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  size?: LinkSizeType;
  icon?: React.ReactNode;
  iconPosition?: IconPositionType;
};

type ExternalLinkProps = BaseProps & {
  external: true;
  navigate?: never;
};

type InternalLinkProps = BaseProps & {
  external?: false;
  navigate?: (to: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export type ILinkProps = ExternalLinkProps | InternalLinkProps;

export interface ILinkLabelProps {
  size: LinkSizeType;
  children: React.ReactNode;
}
