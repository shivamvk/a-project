import {
    disableRunShortcutTooltipPermanently,
    markRunShortcutTooltipShown,
    MAX_SHOWS,
    shouldShowRunShortcutTooltip,
    STORAGE_KEY,
} from "../shortcutTooltip";

describe("run shortcut tooltip helpers", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe("shouldShowRunShortcutTooltip", () => {
        it("returns true when count is not set", () => {
            expect(shouldShowRunShortcutTooltip()).toBe(true);
        });

        it("returns true when count is less than MAX_SHOWS", () => {
            localStorage.setItem(STORAGE_KEY, "1");
            expect(shouldShowRunShortcutTooltip()).toBe(true);
        });

        it("returns false when count reaches MAX_SHOWS", () => {
            localStorage.setItem(STORAGE_KEY, String(MAX_SHOWS));
            expect(shouldShowRunShortcutTooltip()).toBe(false);
        });

        it("returns false when count exceeds MAX_SHOWS", () => {
            localStorage.setItem(STORAGE_KEY, String(MAX_SHOWS + 2));
            expect(shouldShowRunShortcutTooltip()).toBe(false);
        });
    });

    describe("markRunShortcutTooltipShown", () => {
        it("increments count when not set", () => {
            markRunShortcutTooltipShown();
            expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
        });

        it("increments existing count", () => {
            localStorage.setItem(STORAGE_KEY, "2");
            markRunShortcutTooltipShown();
            expect(localStorage.getItem(STORAGE_KEY)).toBe("3");
        });
    });

    describe("disableRunShortcutTooltipPermanently", () => {
        it("sets count to MAX_SHOWS", () => {
            disableRunShortcutTooltipPermanently();
            expect(localStorage.getItem(STORAGE_KEY)).toBe(String(MAX_SHOWS));
        });

        it("prevents tooltip from showing afterwards", () => {
            disableRunShortcutTooltipPermanently();
            expect(shouldShowRunShortcutTooltip()).toBe(false);
        });
    });
});
