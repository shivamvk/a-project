/* eslint-disable @typescript-eslint/no-explicit-any */
import { downloadCSV, toCSV, toSafeFileName } from "../downloadHelpers";

describe("toCSV", () => {
    it("generates CSV with header and rows", () => {
        const csv = toCSV(["id", "name"], [{ id: 1, name: "Alice" }]);

        expect(csv).toBe("id,name\r\n1,Alice");
    });

    it("escapes commas, quotes and newlines", () => {
        const csv = toCSV(["text"], [{ text: 'hello,"world"\nnext' }]);

        expect(csv).toBe('text\r\n"hello,""world""\nnext"');
    });

    it("handles null and undefined values", () => {
        const csv = toCSV(["a", "b"], [{ a: null, b: undefined }]);

        expect(csv).toBe("a,b\r\n,");
    });

    it("returns only header when rows are empty", () => {
        const csv = toCSV(["a", "b"], []);

        expect(csv).toBe("a,b");
    });
});

describe("toSafeFileName", () => {
    it("converts spaces to dashes and lowercases", () => {
        expect(toSafeFileName("My Query Name")).toBe("my-query-name");
    });

    it("removes special characters", () => {
        expect(toSafeFileName("Hello@World!")).toBe("helloworld");
    });

    it("trims extra dashes", () => {
        expect(toSafeFileName("  --Hello--  ")).toBe("hello");
    });

    it("handles empty string", () => {
        expect(toSafeFileName("")).toBe("");
    });
});

describe("downloadCSV", () => {
    const createObjectURL = jest.fn();
    const revokeObjectURL = jest.fn();

    beforeAll(() => {
        (window.URL as any).createObjectURL = createObjectURL;
        (window.URL as any).revokeObjectURL = revokeObjectURL;
    });

    beforeEach(() => {
        createObjectURL.mockClear();
        revokeObjectURL.mockClear();
    });

    it("creates and triggers a CSV download", () => {
        const clickSpy = jest
            .spyOn(document, "createElement")
            .mockImplementation(() => {
                return {
                    click: jest.fn(),
                    set href(_value: string) {},
                    set download(_value: string) {},
                } as any;
            });

        downloadCSV(
            {
                columns: ["a"],
                rows: [{ a: 1 }],
            },
            "Test File",
        );

        expect(createObjectURL).toHaveBeenCalled();
        expect(revokeObjectURL).toHaveBeenCalled();

        clickSpy.mockRestore();
    });
});
