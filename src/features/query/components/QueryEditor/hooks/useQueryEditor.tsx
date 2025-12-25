import { useCallback, useRef, useState } from "react";
import { useActiveQuery } from "../../../hooks/useActiveQuery";
import { useQueryData } from "../../../hooks/useQueryData";
import { executeQuery } from "../../../utils/executeQuery";
import { logger } from "../../../../../utils/logger";

export const useQueryEditor = (query: string, queryName: string) => {
    const [error, setError] = useState("");
    const { activeQueryId, setActiveQueryId } = useActiveQuery();
    const { queries, setQueries } = useQueryData();
    const runIdRef = useRef(0);

    const runQuery = useCallback(async () => {
        if (query.length === 0) {
            setError("Please type your query here...");
            return;
        }

        const currentRunId = ++runIdRef.current;

        setError("");

        const hasActiveQuery = Boolean(activeQueryId);

        const isSqlUnchanged =
            hasActiveQuery &&
            queries[activeQueryId]?.sql.trim() === query.trim();

        // override only when was already on a query and did not change sql
        const shouldOverridePreviousQuery = hasActiveQuery && isSqlUnchanged;

        const id = shouldOverridePreviousQuery
            ? activeQueryId
            : crypto.randomUUID();

        const start = performance.now();

        setActiveQueryId(id);
        setQueries((prev) => {
            let name;

            if (shouldOverridePreviousQuery) {
                // pick existing name
                name = queryName.trim() || prev[id]?.name;
            } else {
                // create new name
                name =
                    queryName.trim() || `Query ${Object.keys(prev).length + 1}`;
            }

            return {
                ...prev,
                [id]: {
                    ...(prev[id] || {}),
                    id,
                    sql: query.trim(),
                    status: "running",
                    name,
                    result: { columns: [], rows: [] },
                    meta: {
                        ...prev?.[id]?.meta,
                        ranAt: Date.now(),
                        durationMs: 0,
                        rowCount: 0,
                    },
                },
            };
        });
        logger.info("Query execution started", {
            queryId: id,
            isOverride: shouldOverridePreviousQuery,
        });

        try {
            const result = await executeQuery();

            // if current run is not the latest run, then skip updating state
            if (currentRunId !== runIdRef.current) return;

            const durationMs = Math.round(performance.now() - start);

            setQueries((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    status: "success",
                    result,
                    meta: {
                        ...prev?.[id]?.meta,
                        durationMs,
                        rowCount: result?.rows?.length,
                    },
                },
            }));
            logger.info("Query execution succeeded", {
                queryId: id,
                rowCount: result?.rows?.length || 0,
                durationMs,
            });
        } catch (err) {
            if (currentRunId !== runIdRef.current) return;
            const durationMs = Math.round(performance.now() - start);

            setQueries((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    status: "failed",
                    result: { columns: [], rows: [] },
                    meta: {
                        ...prev?.[id]?.meta,
                        durationMs,
                        rowCount: 0,
                        comms:
                            err instanceof Error
                                ? err?.message
                                : "Somehting went wrong!",
                    },
                },
            }));
            logger.error("Query execution failed", {
                queryId: id,
                error: err instanceof Error ? err.message : err,
            });
        }
    }, [
        activeQueryId,
        queries,
        query,
        queryName,
        setActiveQueryId,
        setQueries,
    ]);

    return {
        error,
        setError,
        runQuery,
    };
};
