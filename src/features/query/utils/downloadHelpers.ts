/* eslint-disable @typescript-eslint/no-explicit-any */
export function toCSV(columns: string[], rows: Record<string, any>[]): string {
    const escape = (value: any) => {
        if (value == null) return "";
        const str = String(value);
        if (str.includes('"') || str.includes(",") || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const header = columns.map(escape).join(",");

    const body = rows.map((row) =>
        columns.map((col) => escape(row[col])).join(","),
    );

    return [header, ...body].join("\r\n");
}
export function toSafeFileName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function downloadCSV(
    { columns, rows }: { columns: string[]; rows: Record<string, any>[] },
    filename = "results",
) {
    const csv = toCSV(columns, rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const safeName = toSafeFileName(filename);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}.csv`;
    a.click();

    URL.revokeObjectURL(url);
}
