export function timeAgo(ts: number): string {
    const diff = Date.now() - ts;

    const sec = Math.floor(diff / 1000);
    // if (sec < 60) return `${sec}s ago`; // [TODO] Not showing secs since this would change too frequently on the UI

    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;

    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;

    const day = Math.floor(hr / 24);
    return `${day}d ago`;
}
