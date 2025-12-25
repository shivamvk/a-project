import { createContext } from "react";
import type { ActiveQueryContextType } from "../types";

export const ActiveQueryContext = createContext<
    ActiveQueryContextType | undefined
>(undefined);
