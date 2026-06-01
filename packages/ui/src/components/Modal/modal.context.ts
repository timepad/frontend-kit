import { createContext, useContext } from "react";

import { IModalContextValue } from "./modal.types";

export const ModalContext = createContext<IModalContextValue | null>(null);

export const useModalContext = (): IModalContextValue => {
  const value = useContext(ModalContext);
  if (!value) {
    throw new Error("useModalContext must be used within <Modal />");
  }
  return value;
};
