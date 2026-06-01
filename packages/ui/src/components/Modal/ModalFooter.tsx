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
import { ModalFooterLayout } from "./modal.types";
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
        <div className={component("modal-footer", "buttons")()}>
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
        <div
          className={component(
            "modal-footer",
            "buttons",
          )({
            ["full-width"]: true,
          })}
        >
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

const footerLayoutComponents: {
  [K in ModalFooterLayout]: FC<PropsWithChildren>;
} = {
  stack: ModalFooterStack,
  "inline-actions": ModalFooterInlineActions,
  toolbar: ModalFooterToolbar,
};

const ModalFooterRoot: FC<PropsWithChildren> = ({ children }) => {
  const { footerDirection, size, isMobileDevice, withFooterDivider } =
    useModalContext();
  const layout = getModalFooterLayout(size, footerDirection);

  const footerClassName = component("modal-footer")({
    ["divider"]: withFooterDivider,
    ["mobile"]: isMobileDevice,
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
