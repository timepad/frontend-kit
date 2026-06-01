import { FC, PropsWithChildren } from "react";
import { component } from "@frontend-kit/utils";

import "./modal-body.less";
import { useModalContext } from "./modal.context";

export const ModalBody: FC<PropsWithChildren> = ({ children }) => {
  const { isMobileDevice, bodyId } = useModalContext();

  const bodyClassName = component("modal-body")({
    ["mobile"]: isMobileDevice,
  });
  return (
    <div id={bodyId} className={bodyClassName}>
      {children}
    </div>
  );
};
