import { createContext, useContext } from "react";

import { LayerStore } from "./layer.store";

export const LayerContext = createContext<LayerStore | null>(null);

export const useLayerStore = (): LayerStore => {
  const store = useContext(LayerContext);

  if (!store) {
    throw new Error("useLayer must be used within <LayerProvider />");
  }

  return store;
};
