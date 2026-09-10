import { createContext, useContext } from "react";

import { ITabsButtonContextValue } from "./tabs-button.types";

export const TabsButtonContext = createContext<ITabsButtonContextValue | null>(
  null,
);

export const useTabsButtonContext = (): ITabsButtonContextValue => {
  const context = useContext(TabsButtonContext);

  if (!context) {
    throw new Error(
      "TabsButton.List, TabsButton.Tab and TabsButton.Panel must be used within TabsButton",
    );
  }

  return context;
};
