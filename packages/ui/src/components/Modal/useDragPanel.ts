import {
  PointerEvent,
  useCallback,
  useRef,
  useState,
  CSSProperties,
} from "react";

import { ButtonClickHandler } from "./modal.types";

const CLOSE_DRAG_DISTANCE = 96;

interface IUseDragPanelResult {
  contentStyles: CSSProperties;
  handlePointerDown: (event: PointerEvent<HTMLElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLElement>) => void;
  finishDragging: () => void;
  resetDrag: () => void;
}

export const useDragPanel = (
  onClose: ButtonClickHandler | undefined,
  isMobileDevice: boolean,
): IUseDragPanelResult => {
  const startYRef = useRef(0);
  const dragYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [dragY, setDragY] = useState(0);

  const resetDrag = useCallback(() => {
    isDraggingRef.current = false;
    dragYRef.current = 0;
    setDragY(0);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    startYRef.current = event.clientY;
    dragYRef.current = 0;
    isDraggingRef.current = true;
    setDragY(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current) return;

    const nextDragY = Math.max(0, event.clientY - startYRef.current);
    dragYRef.current = nextDragY;
    setDragY(nextDragY);
  };

  const finishDragging = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    const distance = dragYRef.current;
    dragYRef.current = 0;
    setDragY(0);

    if (distance >= CLOSE_DRAG_DISTANCE) {
      onClose?.();
    }
  };

  const contentStyles = isMobileDevice
    ? {
        transform: `translateY(${dragY}px)`,
        transitionDuration: isDraggingRef.current ? "0ms" : undefined,
      }
    : {};

  return {
    contentStyles,
    handlePointerDown,
    handlePointerMove,
    finishDragging,
    resetDrag,
  };
};
