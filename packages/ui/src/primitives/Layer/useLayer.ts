import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";

import { useLayerStore } from "./layer.context";
import {
  IUseLayerOptions,
  IUseLayerResult,
  LayerDismissReason,
} from "./layer.types";

/**
 * Регистрирует слой в стеке при `open === true`.
 *
 * - `dismissTop` — только верхний слой (Escape, backdrop, outside-press, drag).
 * - `closeSelf` — этот слой независимо от стека (action, программное закрытие).
 */
export const useLayer = ({
  open,
  onOpenChange,
  id: idProp,
}: IUseLayerOptions): IUseLayerResult => {
  const generatedId = useId();
  const layerId = idProp ?? generatedId;
  const store = useLayerStore();
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  const closeSelf = useCallback((reason: LayerDismissReason) => {
    onOpenChangeRef.current?.(false, { reason });
  }, []);

  const dismissTop = useCallback(
    (reason: LayerDismissReason) => {
      if (!store.isTop(layerId)) return;

      onOpenChangeRef.current?.(false, { reason });
    },
    [layerId, store],
  );

  useEffect(() => {
    if (!open) return;

    // В store для Escape / dismissTop кладётся только top-only обработчик.
    store.register(layerId, dismissTop);

    return () => {
      store.unregister(layerId);
    };
  }, [open, layerId, dismissTop, store]);

  const isTop = useSyncExternalStore(
    store.subscribe,
    () => {
      return open && store.isTop(layerId);
    },
    () => false,
  );

  return {
    layerId,
    isTop,
    dismissTop,
    closeSelf,
  };
};
