import { FC, PropsWithChildren } from "react";

import { useModalContext } from "./modal.context";
import { Button, IButtonProps } from "../Button";

export const ModalFooterBefore: FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

export const ModalFooterAfter: FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

export const ModalFooterBtnBack: FC<Partial<IButtonProps>> = ({
  label = "Назад",
  size = "l",
  ...props
}) => {
  const { size: modalSize } = useModalContext();
  return (
    <Button
      label={label}
      size={size}
      variant={modalSize === "s" ? "transparent" : "secondary"}
      {...props}
    />
  );
};

export const ModalFooterBtnCancel: FC<Partial<IButtonProps>> = ({
  label = "Отмена",
  size = "l",
  ...props
}) => <Button label={label} size={size} variant="secondary" {...props} />;

export const ModalFooterBtnConfirm: FC<Partial<IButtonProps>> = ({
  label = "Подтвердить",
  size = "l",
  ...props
}) => <Button label={label} size={size} {...props} />;
