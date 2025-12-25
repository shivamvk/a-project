/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { useQueryData } from "../..//hooks/useQueryData";
import { useActiveQuery } from "../../hooks/useActiveQuery";
import { ResultsTable } from "../ResultsTable";

import { timeAgo } from "../../utils/timeHelpers";

import styles from "./ResultsSection.module.css";
import { ErrorState } from "../ErrorState";
import { downloadCSV } from "../../utils/downloadHelpers";
import { Loader } from "../Loader";

function ResultsSection() {
    const { activeQueryId } = useActiveQuery();
    const { queries } = useQueryData();

    const query = queries?.[activeQueryId];
    const { meta } = query || {};
    const { rowCount = 0, ranAt, durationMs, comms } = meta || {};

    const handleExportCsvClick = useCallback(() => {
        if (!query?.result) return;
        downloadCSV(
            {
                columns: query.result?.columns || [],
                rows: (query.result?.rows || []) as Record<string, any>[],
            },
            query.name,
        );
    }, [query]);

    if (!activeQueryId) {
        return <ErrorState text="Run a query to see results" />;
    }

    if (query?.status === "running") {
        return <Loader />;
    }

    if (query?.status === "failed") {
        return <ErrorState text={comms} />;
    }

    return (
        <div className={styles.resultsSection}>
            <h2>Results</h2>
            <hr />
            <section className={styles.metaSection}>
                <span>
                    {rowCount} rows returned
                    {durationMs && <> • {durationMs} ms</>}
                    {ranAt && <> • Last run {timeAgo(ranAt)}</>}{" "}
                </span>
                <button
                    disabled={rowCount === 0}
                    className={styles.exportButton}
                    onClick={handleExportCsvClick}
                >
                    Export CSV
                </button>
            </section>
            <hr />
            {rowCount === 0 && (
                <>
                    Query returned no data
                    <hr />
                </>
            )}
            <ResultsTable results={{ ...query?.result }} />
        </div>
    );
}

export default React.memo(ResultsSection);
