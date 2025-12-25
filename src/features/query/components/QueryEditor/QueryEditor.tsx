import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryData } from "../../hooks/useQueryData";
import { useActiveQuery } from "../../hooks/useActiveQuery";
import RunButton from "./components/RunButton";
import { useTooltip } from "./hooks/useTooltip";
import { useQueryEditor } from "./hooks/useQueryEditor";

interface IQueryEditor {
    query: string;
    setQuery: (str: string) => void;
}

function QueryEditor({ query, setQuery }: IQueryEditor) {
    const { queries } = useQueryData();
    const { activeQueryId } = useActiveQuery();

    const [queryName, setQueryName] = useState(
        () =>
            queries[activeQueryId]?.name ??
            `Query ${Object.keys(queries).length + 1}`,
    );

    const { showTooltip, permanentlyRemoveTooltip, onTooltipShown } =
        useTooltip(query);
    const { error, setError, runQuery } = useQueryEditor(query, queryName);

    const disabled = useMemo(() => query.length === 0, [query]);

    const handleOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (showTooltip) {
                    permanentlyRemoveTooltip();
                }
                runQuery();
            }
        },
        [runQuery, permanentlyRemoveTooltip, showTooltip],
    );

    const handleRun = useCallback(
        (event?: React.FormEvent) => {
            event?.preventDefault();
            if (showTooltip) {
                permanentlyRemoveTooltip();
            }
            runQuery();
        },
        [runQuery, showTooltip, permanentlyRemoveTooltip],
    );

    const handleQueryChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setQuery(e.target.value);
            setError("");
        },
        [setQuery, setError],
    );

    const handleQueryNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setQueryName(e.target.value);
        },
        [],
    );

    useEffect(() => {
        setQuery(queries[activeQueryId]?.sql || "");
    }, [activeQueryId, queries, setQuery]);

    return (
        <section>
            <form onSubmit={handleRun}>
                <label
                    htmlFor="query-name"
                    style={{ display: "block", marginBottom: "4px" }}
                >
                    Query name
                </label>
                <input
                    id="query-name"
                    name="queryName"
                    value={queryName}
                    onChange={handleQueryNameChange}
                    placeholder="Query name for easy search..."
                    style={{
                        width: "40%",
                    }}
                />
                <br />
                <br />
                <textarea
                    id="sql-query-input"
                    name="sqlQuery"
                    value={query}
                    onChange={handleQueryChange}
                    rows={6}
                    placeholder="Write your SQL query here..."
                    onKeyDown={handleOnKeyDown}
                    aria-invalid={error.length > 0}
                />{" "}
                <br />
                <RunButton
                    disabled={disabled}
                    showTooltip={showTooltip}
                    permanentlyRemoveTooltip={permanentlyRemoveTooltip}
                    onTooltipShown={onTooltipShown}
                />
            </form>
        </section>
    );
}

export default React.memo(QueryEditor);
