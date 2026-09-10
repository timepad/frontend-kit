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
 * `dismiss` закрывает слой только если он верхний в стеке.
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

  const dismiss = useCallback(
    (reason: LayerDismissReason) => {
      if (!store.isTop(layerId)) return;

      onOpenChangeRef.current?.(false, { reason });
    },
    [layerId, store],
  );

  useEffect(() => {
    if (!open) return;

    store.register(layerId, dismiss);

    return () => {
      store.unregister(layerId);
    };
  }, [open, layerId, dismiss, store]);

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
    dismiss,
  };
};
