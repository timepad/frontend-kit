import {
  Dispatch,
  PointerEvent,
  SetStateAction,
  useRef,
  useState,
  CSSProperties,
  MutableRefObject,
} from "react";

import { ButtonClickHandler } from "./modal.types";

const CLOSE_DRAG_DISTANCE = 96;

interface IUseDragPanelResult {
  contentStyles: CSSProperties;
  handlePointerDown: (event: PointerEvent<HTMLElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLElement>) => void;
  finishDragging: () => void;
  setDragY: Dispatch<SetStateAction<number>>;
  dragYRef: MutableRefObject<number>;
}

export const useDragPanel = (
  onClose: ButtonClickHandler | undefined,
  isMobileDevice: boolean,
): IUseDragPanelResult => {
  const startYRef = useRef(0);
  const dragYRef = useRef(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    startYRef.current = event.clientY;
    dragYRef.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDragging) return;

    const nextDragY = Math.max(0, event.clientY - startYRef.current);
    dragYRef.current = nextDragY;
    setDragY(nextDragY);
  };

  const finishDragging = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragYRef.current >= CLOSE_DRAG_DISTANCE) {
      onClose?.();
      return;
    }

    dragYRef.current = 0;
    setDragY(0);
  };

  const contentStyles = isMobileDevice
    ? {
        transform: `translateY(${dragY}px)`,
        transitionDuration: isDragging ? "0ms" : undefined,
      }
    : {};

  return {
    contentStyles,
    handlePointerDown,
    handlePointerMove,
    finishDragging,
    setDragY,
    dragYRef,
  };
};
