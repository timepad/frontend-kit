import { FC, PropsWithChildren } from "react";
import { component } from "@frontend-kit/utils";

import { useModalContext } from "./modal.context";

export const ModalBody: FC<PropsWithChildren> = ({ children }) => {
  const { isMobilePortraitMax } = useModalContext();

  const bodyClassName = component("modal-header")({
    ["mobile"]: isMobilePortraitMax,
  });
  return <div className={bodyClassName}>{children}</div>;
};
