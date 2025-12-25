import { createContext } from "react";
import type { QueryDataContextType } from "../types";

export const QueryDataContext = createContext<QueryDataContextType | undefined>(
    undefined,
);
