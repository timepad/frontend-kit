import { FC, PropsWithChildren } from "react";
import { component } from "@frontend-kit/utils";

import "./modal-header.less";
import { useModalContext } from "./modal.context";
import { IBtnBackProps, IBtnCloseProps } from "./modal.types";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import {
  IconChevronLeft24Outline,
  IconCross24Outline,
} from "../../assets/icons";

const BtnBack: FC<IBtnBackProps> = ({ onBack }) => {
  const btnBackClassName = component("modal-header", "btn-back")();

  return (
    <div className={btnBackClassName}>
      <IconButton
        onClick={onBack}
        icon={<IconChevronLeft24Outline />}
        variant="transparent"
        ariaLabel="Вернуться на предыдущий шаг"
        title="Назад"
        size="s"
      />
    </div>
  );
};

const BtnClose: FC<IBtnCloseProps> = ({ onClose }) => {
  const btnCloseClassName = component("modal-header", "btn-close")();

  return (
    <div className={btnCloseClassName}>
      <IconButton
        onClick={onClose}
        icon={<IconCross24Outline />}
        variant="secondary"
        ariaLabel="Закрыть модальное окно"
        title="Закрыть"
        size="s"
      />
    </div>
  );
};

const Title: FC<PropsWithChildren> = ({ children }) => {
  const titleClassName = component("modal-header", "title")();

  return (
    <Typography.Header
      tag="H3 ACCENT BOLD"
      className={titleClassName}
    >
      {children}
    </Typography.Header>
  );
};

const Subtitle: FC<PropsWithChildren> = ({ children }) => {
  const subtitleClassName = component("modal-header", "subtitle")();

  return (
    <Typography.Paragraph tag="P4 REGULAR" className={subtitleClassName}>
      {children}
    </Typography.Paragraph>
  );
};

const ModalHeaderRoot: FC<PropsWithChildren> = ({ children }) => {
  const { headerAlign, isMobileDevice } = useModalContext();

  const headerClassName = component("modal-header")({
    ["align-start"]: headerAlign === "start",
    ["mobile"]: isMobileDevice,
  });

  return <div className={headerClassName}>{children}</div>;
};

export const ModalHeader = Object.assign(ModalHeaderRoot, {
  BtnBack,
  BtnClose,
  Title,
  Subtitle,
});
