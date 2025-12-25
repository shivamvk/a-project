import { useContext } from "react";
import { QueryDataContext } from "../contexts";

export const useQueryData = () => {
    const ctx = useContext(QueryDataContext);
    if (!ctx) {
        throw new Error("useQueryData must be used within QueryDataProvider");
    }
    return ctx;
};
