import { FC, PropsWithChildren, useEffect, useMemo } from "react";

import { LayerContext } from "./layer.context";
import { createLayerStore } from "./layer.store";

const useEscapeDismiss = (store: ReturnType<typeof createLayerStore>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (event.defaultPrevented) return;

      const topId = store.getTopId();
      if (!topId) return;

      event.preventDefault();
      store.dismissTop("escape");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [store]);
};

/**
 * Провайдер стека слоёв (Modal, Dropdown, Popover).
 * Централизует Escape: закрывается только верхний активный слой.
 */
export const LayerProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const store = useMemo(() => createLayerStore(), []);

  useEscapeDismiss(store);

  return (
    <LayerContext.Provider value={store}>{children}</LayerContext.Provider>
  );
};
