import {
  ReactNode,
  MouseEvent,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";

type ModalSize = "s" | "m" | "l" | "full";

type DeviceType = "mobile" | "desktop";

export type ButtonClickHandler = (
  event?: MouseEvent<HTMLButtonElement>,
) => void;

export interface IModalProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> {
  isOpen: boolean;
  onClose?: ButtonClickHandler;
  deviceType?: DeviceType;
  size?: ModalSize;
}

// Header types
export interface IModalHeaderProps {
  textLeft?: boolean;
}

export interface IBtnCloseProps {
  onClose: ButtonClickHandler;
}

export interface IBtnBackProps {
  onBack: ButtonClickHandler;
}

export type ModalFooterLayout = "stack" | "inline-actions" | "toolbar";

interface IBaseModalFooterProps {
  onConfirmHandler: ButtonClickHandler;
  onCancelHandler?: ButtonClickHandler;
  onBackHandler?: ButtonClickHandler;
  beforeContent?: ReactNode;
  afterContent?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  backLabel?: string;
  withDivider?: boolean;
  disabled?: boolean;
}

export type IModalFooterStackProps = IBaseModalFooterProps & {
  layout: Extract<ModalFooterLayout, "stack">;
  device: DeviceType;
};

export type IModalFooterInlineActionsProps = IBaseModalFooterProps & {
  layout: Extract<ModalFooterLayout, "inline-actions">;
  onBackHandler?: never;
};

export type IModalFooterToolbarProps = IBaseModalFooterProps & {
  layout: Extract<ModalFooterLayout, "toolbar">;
};

export type IModalFooterProps =
  | IModalFooterStackProps
  | IModalFooterInlineActionsProps
  | IModalFooterToolbarProps;
