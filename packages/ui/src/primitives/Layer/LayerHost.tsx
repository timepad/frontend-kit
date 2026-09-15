import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type LayerHostValue = HTMLElement | null | undefined;

/** `undefined` — провайдера нет; `null` — LayerHost монтируется. */
const LayerHostContext = createContext<LayerHostValue>(undefined);

export const LayerHost: FC<PropsWithChildren> = ({ children }) => {
  const [hostNode, setHostNode] = useState<HTMLDivElement | null>(null);

  return (
    <LayerHostContext.Provider value={hostNode}>
      {children}

      <div ref={setHostNode} data-layer-host />
    </LayerHostContext.Provider>
  );
};

export const useLayerHost = (): LayerHostValue => {
  return useContext(LayerHostContext);
};

/**
 * Возвращает:
 *
 * HTMLElement — готовый portal target.
 * null — LayerHost есть, но ещё монтируется.
 * document.body — LayerHost отсутствует.
 */
export const getLayerPortalContainer = (
  host: LayerHostValue,
): HTMLElement | null => {
  if (host === null) return null;

  if (host) return host;

  if (typeof document === "undefined") return null;

  return document.body;
};
