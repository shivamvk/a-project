import React, { useLayoutEffect, useRef, useState } from "react";
import type { Results } from "../../types";

import styles from "./ResultsTable.module.css";

interface IResultsTable {
    results: Results;
}

const ROW_HEIGHT = 36;
const OVERSCAN = 5;

export function ResultsTable({ results }: IResultsTable) {
    const { columns, rows } = results;

    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const [scrollTop, setScrollTop] = useState(0);
    const [height, setHeight] = useState(0);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const top = e.currentTarget.scrollTop;

        if (rafRef.current !== null) return;

        rafRef.current = requestAnimationFrame(() => {
            setScrollTop(top);
            rafRef.current = null;
        });
    };

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const measure = () => {
            setHeight(containerRef.current!.getBoundingClientRect().height);
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(containerRef.current);

        return () => ro.disconnect();
    }, []);

    const totalRows = rows?.length || 0;

    const visibleRowCount = Math.ceil(height / ROW_HEIGHT);
    const firstVisibleRow = Math.floor(scrollTop / ROW_HEIGHT);

    const startIndex = Math.max(0, firstVisibleRow - OVERSCAN);
    const endIndex = Math.min(
        totalRows,
        firstVisibleRow + visibleRowCount + OVERSCAN,
    );
    const visibleRows = rows?.slice(startIndex, endIndex);

    return (
        <div
            ref={containerRef}
            className={styles.tableScroll}
            onScroll={onScroll}
        >
            {/* Sticky / stable header */}
            <table className={styles.tableMain}>
                <thead className={styles.tableHeader}>
                    <tr>
                        {columns?.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {/* spacer row */}
                    <tr style={{ height: startIndex * ROW_HEIGHT }}>
                        <td colSpan={columns?.length} />
                    </tr>

                    {visibleRows?.map((row, i) => (
                        <tr key={startIndex + i}>
                            {columns?.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}

                    {/* bottom spacer */}
                    <tr style={{ height: (totalRows - endIndex) * ROW_HEIGHT }}>
                        <td colSpan={columns?.length} />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default React.memo(ResultsTable);
