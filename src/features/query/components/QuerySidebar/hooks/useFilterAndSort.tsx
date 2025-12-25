import { useMemo } from "react";
import { useQueryData } from "../../../hooks/useQueryData";
import { useActiveQuery } from "../../../hooks/useActiveQuery";

export const useFilterAndSort = (searchTerm: string) => {
    const { queries } = useQueryData();
    const { activeQueryId } = useActiveQuery();

    // first filter based on search term
    const filteredQueries = useMemo(() => {
        const fQueries = Object.values(queries).filter(
            (q) =>
                q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.sql.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        const activeQuery = activeQueryId ? queries[activeQueryId] : null;

        // if there is an active query, that should bypass searching and come on top
        return activeQuery
            ? [activeQuery, ...fQueries.filter((q) => q.id !== activeQuery.id)]
            : fQueries;
    }, [queries, searchTerm, activeQueryId]);

    // then sort the filtered queries based on the last execution time
    const sortedQueries = useMemo(() => {
        return [...filteredQueries].sort((a, b) => {
            if (!a.meta?.ranAt) return 1;
            if (!b.meta?.ranAt) return -1;
            return b.meta?.ranAt - a.meta?.ranAt;
        });
    }, [filteredQueries]);

    return {
        queriesToDisplay: sortedQueries,
    };
};
