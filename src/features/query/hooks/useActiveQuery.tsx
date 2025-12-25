import { useContext } from "react";
import { ActiveQueryContext } from "../contexts";

export const useActiveQuery = () => {
    const ctx = useContext(ActiveQueryContext);
    if (!ctx) {
        throw new Error(
            "useActiveQuery must be used within ActiveQueryProvider",
        );
    }
    return ctx;
};
