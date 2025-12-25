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

    // to throttle scroll updates to once per animation frame
    const rafRef = useRef<number | null>(null);

    const [scrollTop, setScrollTop] = useState(0);
    const [height, setHeight] = useState(0);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const top = e.currentTarget.scrollTop;

        // prevent multiple state updates within the same frame
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

        // observe container resize to keep virtualization in sync with layout changes
        // ideally container should not be resized but this is a safety net
        const ro = new ResizeObserver(measure);
        ro.observe(containerRef.current);

        return () => ro.disconnect();
    }, []);

    const visibleRowCount = Math.ceil(height / rowHeight);
    const firstVisibleRow = Math.floor(scrollTop / rowHeight);

    // expand render window by overscan to avoid blank gaps during fast scroll
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
