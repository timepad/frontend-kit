import { createContext, useContext } from "react";

import { ModalContextValue } from "./modal.types";

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = (): ModalContextValue => {
  const value = useContext(ModalContext);
  if (!value) {
    throw new Error("useModalContext must be used within <Modal />");
  }
  return value;
};
