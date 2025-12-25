export const STORAGE_KEY = "run_shortcut_tooltip_shown_count";
export const MAX_SHOWS = 2;

// [TODO] can have window check but not needed rn since this is a csr app
export function shouldShowRunShortcutTooltip(): boolean {
    const count = Number(localStorage.getItem(STORAGE_KEY) || 0);
    return count < MAX_SHOWS;
}

export function markRunShortcutTooltipShown() {
    const count = Number(localStorage.getItem(STORAGE_KEY) || 0);
    localStorage.setItem(STORAGE_KEY, String(count + 1));
}

export function disableRunShortcutTooltipPermanently() {
    localStorage.setItem(STORAGE_KEY, String(MAX_SHOWS));
}
