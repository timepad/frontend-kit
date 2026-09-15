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
  const openRef = useRef(open);
  openRef.current = open;

  const { dismissTop, closeSelf } = useLayer({
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
  } = useDragPanel(onOpenChange ? dismissTop : undefined, isMobilePortraitMax);

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

    // Escape не закрывает dialog нативно — его обрабатывает LayerProvider.
    const handleCancel = (event: Event) => {
      event.preventDefault();
    };

    // Любое нативное закрытие (form method=dialog, dialog.close() извне)
    // синхронизируем с controlled `open`.
    const handleClose = () => {
      if (!openRef.current) return;
      closeSelf("action");
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, [closeSelf]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== dialogRef.current) return;

    dismissTop("backdrop");
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
      closeSelf,
    } satisfies IModalContextValue;
  }, [
    isMobilePortraitMax,
    modalSize,
    footerDirection,
    headerAlign,
    showFooterDivider,
    closeSelf,
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
