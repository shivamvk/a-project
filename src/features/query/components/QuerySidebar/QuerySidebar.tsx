import React, { useCallback, useState } from "react";
import { useActiveQuery } from "../../hooks/useActiveQuery";
import type { Query } from "../../types";
import { sampleQueries } from "../../data/sampleQueries";
import { useFilterAndSort } from "./hooks/useFilterAndSort";
import { createHistoryTitle } from "./utils";

interface IQueryPage {
    setQuery: (str: string) => void;
}

function QuerySidebar({ setQuery }: IQueryPage) {
    const { activeQueryId, setActiveQueryId } = useActiveQuery();

    const [searchTerm, setSearchTerm] = useState("");

    const handleNewQuery = useCallback(() => {
        setActiveQueryId("");
    }, [setActiveQueryId]);

    const { queriesToDisplay } = useFilterAndSort(searchTerm);

    const handleQuerySelect = useCallback(
        (e: React.MouseEvent<HTMLUListElement>) => {
            if (!(e.target instanceof HTMLElement)) return;

            const li = e.target.closest<HTMLLIElement>("li[data-query-id]");
            const id = li?.dataset?.queryId || "";

            if (li?.dataset?.sampleQuery) {
                // set editor query to sample query
                setQuery(sampleQueries.find((q) => q.id === id)?.sql || "");
            } else {
                setActiveQueryId(id);
            }
        },
        [setActiveQueryId, setQuery],
    );

    const handleOnChangeSearchTerm = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
        },
        [],
    );

    return (
        <nav aria-label="Query menu">
            <button onClick={handleNewQuery}>New Query +</button>

            <h2>Query History</h2>
            <input
                value={searchTerm}
                onChange={handleOnChangeSearchTerm}
                placeholder="Search previous queries"
            />
            <ul onClick={handleQuerySelect} role={"listbox"}>
                {Object.values(queriesToDisplay).map((query: Query) => (
                    <li key={query.id} data-query-id={query.id}>
                        {activeQueryId === query.id ? (
                            <strong aria-current="true">
                                {createHistoryTitle(query)}
                            </strong>
                        ) : (
                            createHistoryTitle(query)
                        )}
                    </li>
                ))}
            </ul>

            <h2>Sample queries</h2>
            <ul onClick={handleQuerySelect}>
                {sampleQueries.map((query: Query) => (
                    <li
                        key={query.id}
                        data-query-id={query.id}
                        data-sample-query={true}
                    >
                        {query.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default React.memo(QuerySidebar);
