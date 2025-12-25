import { useState } from "react";
import type { Query } from "../types";
import { QueryDataContext } from "./QueryDataContext";

export const QueryDataProvider: React.FC<{
    initialQueries: Record<string, Query>;
    children: React.ReactNode;
}> = ({ initialQueries, children }) => {
    const [queries, setQueries] =
        useState<Record<string, Query>>(initialQueries);

    return (
        <QueryDataContext.Provider value={{ queries, setQueries }}>
            {children}
        </QueryDataContext.Provider>
    );
};
