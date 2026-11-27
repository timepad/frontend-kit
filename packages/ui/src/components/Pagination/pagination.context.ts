import { createContext, useContext } from "react";

import { IPaginationContextValue } from "./pagination.types";

export const PaginationContext = createContext<IPaginationContextValue | null>(
  null,
);

export const usePaginationContext = (): IPaginationContextValue => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error(
      "Pagination.Prev, Pagination.Next and Pagination.Pages must be used within Pagination",
    );
  }

  return context;
};
