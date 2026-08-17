import { FC, PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { classNames, component } from "@frontend-kit/utils";
import { useMedia } from "@frontend-kit/hooks";

import "./modal.less";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { ModalBody } from "./ModalBody";
import { useDragPanel } from "./useDragPanel";
import { IModalContextValue, IModalProps } from "./modal.types";
import { ModalContext } from "./modal.context";
import { LayerHost, useLayer } from "../../primitives/Layer";

const ModalRoot: FC<PropsWithChildren<IModalProps>> = ({
  open,
  onOpenChange,
  children,
  className,
  size = "s",
  footerDirection = "column",
  headerAlign = "center",
  withFooterDivider = false,
  withBackdropBlur = true,
  ...props
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const { dismiss } = useLayer({
    open,
    onOpenChange,
  });

  const { isMobilePortraitMax } = useMedia();
  const {
    contentStyles,
    handlePointerDown,
    handlePointerMove,
    finishDragging,
    resetDrag,
  } = useDragPanel(onOpenChange ? dismiss : undefined, isMobilePortraitMax);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
      resetDrag();
    }
  }, [open, resetDrag]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Нативный cancel не закрывает dialog — Escape обрабатывает LayerProvider / useLayer.
    const handleCancel = (event: Event) => {
      event.preventDefault();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== dialogRef.current) return;

    dismiss("backdrop");
  };

  const modalSize = isMobilePortraitMax ? "s" : size;
  const showFooterDivider = modalSize !== "s" && withFooterDivider;

  const contextValue = useMemo(() => {
    return {
      size: modalSize,
      footerDirection: isMobilePortraitMax ? "column" : footerDirection,
      headerAlign,
      isMobileDevice: isMobilePortraitMax,
      withFooterDivider: showFooterDivider,
      dismiss,
    } satisfies IModalContextValue;
  }, [
    isMobilePortraitMax,
    modalSize,
    footerDirection,
    headerAlign,
    showFooterDivider,
    dismiss,
  ]);

  const modalClassName = classNames(
    component("modal")({
      [`size-${modalSize}`]: true,
      ["backdrop-blur"]: withBackdropBlur,
    }),
    className,
  );

  const contentClassName = component(
    "modal",
    "content",
  )({
    mobile: isMobilePortraitMax,
  });

  return (
    <dialog
      {...props}
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={modalClassName}
    >
      <LayerHost>
        <div className={contentClassName} style={contentStyles}>
          {isMobilePortraitMax && onOpenChange && (
            <div
              aria-hidden="true"
              className={component("modal", "drag-panel")()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishDragging}
              onPointerCancel={finishDragging}
              onLostPointerCapture={finishDragging}
            />
          )}
          <ModalContext.Provider value={contextValue}>
            {children}
          </ModalContext.Provider>
        </div>
      </LayerHost>
    </dialog>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
