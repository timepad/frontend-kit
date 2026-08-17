import { LayerDismissHandler, LayerDismissReason } from "./layer.types";

type LayerStoreListener = () => void;

export type LayerStore = {
  register: (id: string, dismiss: LayerDismissHandler) => void;
  unregister: (id: string) => void;
  isTop: (id: string) => boolean;
  getTopId: () => string | null;
  dismissTop: (reason: LayerDismissReason) => void;
  subscribe: (listener: LayerStoreListener) => () => void;
};

export const createLayerStore = (): LayerStore => {
  const stack: string[] = [];
  const dismissById = new Map<string, LayerDismissHandler>();
  const listeners = new Set<LayerStoreListener>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const register = (id: string, dismiss: LayerDismissHandler) => {
    dismissById.set(id, dismiss);

    const existingIndex = stack.indexOf(id);
    if (existingIndex !== -1) {
      stack.splice(existingIndex, 1);
    }

    stack.push(id);
    emit();
  };

  const unregister = (id: string) => {
    const index = stack.indexOf(id);
    if (index === -1) return;

    stack.splice(index, 1);
    dismissById.delete(id);
    emit();
  };

  const getTopId = () => stack[stack.length - 1] ?? null;

  const isTop = (id: string) => getTopId() === id;

  const dismissTop = (reason: LayerDismissReason) => {
    const topId = getTopId();
    if (!topId) return;

    dismissById.get(topId)?.(reason);
  };

  const subscribe = (listener: LayerStoreListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    register,
    unregister,
    isTop,
    getTopId,
    dismissTop,
    subscribe,
  };
};
