import React from "react";

// types
import type { Results } from "../../types";

// hooks
import { useVirtualization } from "./hooks/useVirtualization";
import { useColumnResize } from "./hooks/useColumnResize";

// styles
import styles from "./ResultsTable.module.css";

interface IResultsTable {
    results: Results;
}

const ROW_HEIGHT = 36;
const OVERSCAN = 5;
const MIN_COL_WIDTH = 120;
const MAX_COL_WIDTH = 200;

export function ResultsTable({ results }: IResultsTable) {
    const { columns, rows } = results;
    const totalRows = rows?.length || 0;

    const { containerRef, onScroll, startIndex, endIndex } = useVirtualization({
        rowHeight: ROW_HEIGHT,
        overscan: OVERSCAN,
        totalRows,
    });

    const {
        columnWidths,
        startResize,
        isReady: isColumnWidthsReady,
    } = useColumnResize({
        columns,
        containerRef,
        minWidth: MIN_COL_WIDTH,
        maxWidth: MAX_COL_WIDTH,
    });

    const visibleRows = rows?.slice(startIndex, endIndex);

    return (
        <div
            ref={containerRef}
            className={styles.tableScroll}
            onScroll={onScroll}
        >
            {isColumnWidthsReady && (
                <table className={styles.tableMain}>
                    <colgroup>
                        {columns?.map((col) => (
                            <col
                                key={col}
                                style={{ width: columnWidths[col] ?? 200 }}
                            />
                        ))}
                    </colgroup>

                    {/* Sticky header */}
                    <thead className={styles.tableHeader}>
                        <tr>
                            {columns?.map((col) => (
                                <th key={col}>
                                    <span>{col}</span>
                                    <span
                                        className={styles.resizeHandle}
                                        onMouseDown={(e) => startResize(e, col)}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Top spacer */}
                        <tr style={{ height: startIndex * ROW_HEIGHT }}>
                            <td colSpan={columns?.length} />
                        </tr>

                        {/* Visible rows */}
                        {visibleRows?.map((row, i) => {
                            const rowIndex = startIndex + i;
                            return (
                                <tr key={rowIndex}>
                                    {columns?.map((col) => (
                                        <td key={col}>{row[col]}</td>
                                    ))}
                                </tr>
                            );
                        })}

                        {/* Bottom spacer */}
                        <tr
                            style={{
                                height: (totalRows - endIndex) * ROW_HEIGHT,
                            }}
                        >
                            <td colSpan={columns?.length} />
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default React.memo(ResultsTable);
