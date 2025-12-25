import { timeAgo } from "../timeHelpers";

describe("timeAgo", () => {
    const NOW = 1_700_000_000_000; // fixed timestamp

    beforeAll(() => {
        jest.spyOn(Date, "now").mockReturnValue(NOW);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("returns minutes ago for less than 1 hour", () => {
        const fiveMinutesAgo = NOW - 5 * 60 * 1000;
        expect(timeAgo(fiveMinutesAgo)).toBe("5m ago");
    });

    it("returns hours ago for less than 24 hours", () => {
        const threeHoursAgo = NOW - 3 * 60 * 60 * 1000;
        expect(timeAgo(threeHoursAgo)).toBe("3h ago");
    });

    it("returns days ago for more than 24 hours", () => {
        const twoDaysAgo = NOW - 2 * 24 * 60 * 60 * 1000;
        expect(timeAgo(twoDaysAgo)).toBe("2d ago");
    });

    it("returns 0m ago for current timestamp", () => {
        expect(timeAgo(NOW)).toBe("0m ago");
    });
});
