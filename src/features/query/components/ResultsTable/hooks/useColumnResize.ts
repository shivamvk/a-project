import { useEffect, useState } from "react";

interface ColumnResizeParams {
    columns?: string[];
    containerRef: React.RefObject<HTMLDivElement | null>;
    minWidth: number;
    maxWidth: number;
}

export function useColumnResize({
    columns,
    containerRef,
    minWidth,
    maxWidth,
}: ColumnResizeParams) {
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
        {},
    );

    useEffect(() => {
        if (!columns?.length || !containerRef.current) return;

        setColumnWidths((prev) => {
            if (Object.keys(prev).length) return prev;

            const containerWidth =
                containerRef.current!.getBoundingClientRect().width;

            const baseWidth = Math.floor(containerWidth / columns.length);

            const initial: Record<string, number> = {};
            columns.forEach((col) => {
                initial[col] = Math.min(
                    maxWidth,
                    Math.max(minWidth, baseWidth),
                );
            });

            return initial;
        });
    }, [columns, containerRef, minWidth, maxWidth]);

    const startResize = (e: React.MouseEvent, column: string) => {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = columnWidths[column];

        const onMouseMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX;
            const nextWidth = startWidth + delta;

            setColumnWidths((prev) => ({
                ...prev,
                [column]: Math.min(maxWidth, Math.max(minWidth, nextWidth)),
            }));
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const isReady =
        (columns?.length || 0) > 0 &&
        Object.keys(columnWidths).length === columns?.length;

    return {
        columnWidths,
        startResize,
        isReady,
    };
}
