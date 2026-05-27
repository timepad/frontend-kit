import {
  MouseEvent,
  PropsWithChildren,
  DetailedHTMLProps,
  HTMLAttributes,
  FC,
} from "react";

export type ModalSize = "s" | "m" | "l" | "full";

export type ModalHeaderAlign = "start" | "center";

export type ModalFooterDirection = "column" | "row";

export type ModalContextValue = {
  size: ModalSize;
  footerDirection: ModalFooterDirection;
  headerAlign: ModalHeaderAlign;
  isMobilePortraitMax: boolean;
};

export type ButtonClickHandler = (
  event?: MouseEvent<HTMLButtonElement>,
) => void;

export interface IModalProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> {
  isOpen: boolean;
  onClose?: ButtonClickHandler;
  size?: ModalSize;
  footerDirection?: ModalFooterDirection;
  headerAlign?: ModalHeaderAlign;
}

export interface IBtnCloseProps {
  onClose: ButtonClickHandler;
}

export interface IBtnBackProps {
  onBack: ButtonClickHandler;
}

export type ModalFooterLayoutComponentMap = {
  [K in ModalFooterLayout]: FC<PropsWithChildren>;
};

export type ModalFooterLayout = "stack" | "inline-actions" | "toolbar";

export interface IModalFooterProps {
  withDivider?: boolean;
}
