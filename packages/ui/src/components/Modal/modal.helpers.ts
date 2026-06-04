import { Children, isValidElement, ReactElement, ReactNode } from "react";

import {
  ModalFooterAfter,
  ModalFooterBefore,
  ModalFooterBtnBack,
  ModalFooterBtnCancel,
  ModalFooterBtnConfirm,
} from "./ModalFooterSlots";
import {
  ModalFooterDirection,
  ModalFooterLayout,
  ModalSize,
} from "./modal.types";

type ModalFooterSlots = {
  Before?: ReactElement;
  After?: ReactElement;
  BtnBack?: ReactElement;
  BtnCancel?: ReactElement;
  BtnConfirm?: ReactElement;
};

const footerSlotComponents = {
  Before: ModalFooterBefore,
  After: ModalFooterAfter,
  BtnBack: ModalFooterBtnBack,
  BtnCancel: ModalFooterBtnCancel,
  BtnConfirm: ModalFooterBtnConfirm,
} as const;

export const getModalFooterSlots = (children: ReactNode): ModalFooterSlots => {
  const slots: ModalFooterSlots = {};

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    for (const slotName of Object.keys(
      footerSlotComponents,
    ) as (keyof typeof footerSlotComponents)[]) {
      if (child.type === footerSlotComponents[slotName]) {
        slots[slotName] = child;
        return;
      }
    }
  });

  return slots;
};

/**
 * stack — колонка (size s, footerDirection column)
 * inline-actions — cancel/confirm в ряд (size s, footerDirection row)
 * toolbar — сетка с back и слотами before/after (size m / l / full)
 */
export const getModalFooterLayout = (
  size: ModalSize,
  footerDirection: ModalFooterDirection,
): ModalFooterLayout => {
  if (size === "m" || size === "l" || size === "full") {
    return "toolbar";
  }

  return footerDirection === "row" ? "inline-actions" : "stack";
};
