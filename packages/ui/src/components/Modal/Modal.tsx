import {
  FC,
  PropsWithChildren,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import { classNames, component } from "@frontend-kit/utils";
import { useMedia } from "@frontend-kit/hooks";

import "./modal.less";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { ModalBody } from "./ModalBody";
import { useDragPanel } from "./useDragPanel";
import { IModalContextValue, IModalProps } from "./modal.types";
import { ModalContext } from "./modal.context";

const ModalRoot: FC<PropsWithChildren<IModalProps>> = ({
  isOpen,
  onClose,
  children,
  className,
  size = "s",
  footerDirection = "column",
  headerAlign = "center",
  withFooterDivider = false,
  withBackdropBlur = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const titleId = useId();
  const bodyId = useId();

  const { isMobilePortraitMax } = useMedia();
  const {
    contentStyles,
    setDragY,
    dragYRef,
    handlePointerDown,
    handlePointerMove,
    finishDragging,
  } = useDragPanel(onClose, isMobilePortraitMax);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
      if (isMobilePortraitMax) {
        setDragY(0);
        dragYRef.current = 0;
      }
    }
  }, [isOpen, isMobilePortraitMax]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose?.();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose?.();
    }
  };

  const modalSize = isMobilePortraitMax ? "s" : size;

  const contextValue = useMemo(() => {
    return {
      size: modalSize,
      footerDirection: isMobilePortraitMax ? "column" : footerDirection,
      headerAlign,
      isMobileDevice: isMobilePortraitMax,
      withFooterDivider,
      titleId,
      bodyId,
    } satisfies IModalContextValue;
  }, [
    isMobilePortraitMax,
    size,
    footerDirection,
    headerAlign,
    withFooterDivider,
    titleId,
    bodyId,
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
    ["mobile"]: isMobilePortraitMax,
  });

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      onClick={handleBackdropClick}
      className={modalClassName}
    >
      <div className={contentClassName} style={contentStyles}>
        {isMobilePortraitMax && onClose && (
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
    </dialog>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
