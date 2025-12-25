import { useLayoutEffect, useRef, useState } from "react";

interface VirtualizationParams {
    rowHeight: number;
    overscan: number;
    totalRows: number;
}

export function useVirtualization({
    rowHeight,
    overscan,
    totalRows,
}: VirtualizationParams) {
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

    const visibleRowCount = Math.ceil(height / rowHeight);
    const firstVisibleRow = Math.floor(scrollTop / rowHeight);

    const startIndex = Math.max(0, firstVisibleRow - overscan);
    const endIndex = Math.min(
        totalRows,
        firstVisibleRow + visibleRowCount + overscan,
    );

    return {
        containerRef,
        onScroll,
        startIndex,
        endIndex,
    };
}
