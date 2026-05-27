import { FC, PropsWithChildren } from "react";
import { component } from "@frontend-kit/utils";

import "./modal-footer.less";

import {
  ModalFooterAfter,
  ModalFooterBefore,
  ModalFooterBtnBack,
  ModalFooterBtnCancel,
  ModalFooterBtnConfirm,
} from "./ModalFooterSlots";
import {
  IModalFooterProps,
  ModalFooterLayoutComponentMap,
} from "./modal.types";
import { useModalContext } from "./modal.context";
import { getModalFooterLayout, getModalFooterSlots } from "./modal.helpers";

const ModalFooterToolbar: FC<PropsWithChildren> = ({ children }) => {
  const { Before, BtnBack, BtnCancel, BtnConfirm, After } =
    getModalFooterSlots(children);

  const hasRowButtons = BtnBack || BtnCancel || BtnConfirm;

  return (
    <>
      {Before && (
        <div className={component("modal-footer", "before-content")()}>
          {Before}
        </div>
      )}
      {hasRowButtons && (
        <div className={component("modal-footer", "row-buttons")()}>
          {BtnBack && (
            <div className={component("modal-footer", "btn-back")()}>
              {BtnBack}
            </div>
          )}
          {BtnCancel}
          {BtnConfirm}
        </div>
      )}
      {After && (
        <div className={component("modal-footer", "after-content")()}>
          {After}
        </div>
      )}
    </>
  );
};

const ModalFooterInlineActions: FC<PropsWithChildren> = ({ children }) => {
  const { Before, BtnCancel, BtnConfirm, After } =
    getModalFooterSlots(children);

  const hasRowButtons = BtnCancel || BtnConfirm;

  return (
    <>
      {Before}
      {hasRowButtons && (
        <div className={component("modal-footer", "row-buttons")()}>
          {BtnCancel}
          {BtnConfirm}
        </div>
      )}
      {After}
    </>
  );
};

const ModalFooterStack: FC<PropsWithChildren> = ({ children }) => {
  const { Before, BtnConfirm, BtnCancel, BtnBack, After } =
    getModalFooterSlots(children);
  return (
    <>
      {Before}
      {BtnConfirm}
      {BtnCancel}
      {BtnBack}
      {After}
    </>
  );
};

const footerLayoutComponents: ModalFooterLayoutComponentMap = {
  stack: ModalFooterStack,
  "inline-actions": ModalFooterInlineActions,
  toolbar: ModalFooterToolbar,
};

const ModalFooterRoot: FC<PropsWithChildren<IModalFooterProps>> = ({
  children,
  withDivider,
}) => {
  const { footerDirection, size, isMobilePortraitMax } = useModalContext();
  const layout = getModalFooterLayout(size, footerDirection);

  const footerClassName = component("modal-footer")({
    ["divider"]: withDivider,
    ["mobile"]: isMobilePortraitMax,
    [layout]: true,
  });
  const LayoutComponent = footerLayoutComponents[layout];

  return (
    <div className={footerClassName}>
      <LayoutComponent>{children}</LayoutComponent>
    </div>
  );
};

export const ModalFooter = Object.assign(ModalFooterRoot, {
  Before: ModalFooterBefore,
  After: ModalFooterAfter,
  BtnBack: ModalFooterBtnBack,
  BtnCancel: ModalFooterBtnCancel,
  BtnConfirm: ModalFooterBtnConfirm,
});
