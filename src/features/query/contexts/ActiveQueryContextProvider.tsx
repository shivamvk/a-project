import { ActiveQueryContext } from "./ActiveQueryContext";
import { useState } from "react";

export const ActiveQueryProvider: React.FC<{
    initialActiveQueryId: string;
    children: React.ReactNode;
}> = ({ initialActiveQueryId, children }) => {
    const [activeQueryId, setActiveQueryId] =
        useState<string>(initialActiveQueryId);

    return (
        <ActiveQueryContext.Provider
            value={{ activeQueryId, setActiveQueryId }}
        >
            {children}
        </ActiveQueryContext.Provider>
    );
};
