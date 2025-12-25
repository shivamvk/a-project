type QueryStatus = "failed" | "running" | "success";

export type Results = {
    columns?: string[];
    rows?: Record<string, React.ReactNode>[];
};

export type Query = {
    id: string;
    name: string;
    sql: string;
    status: QueryStatus;
    result: Results;
    meta?: IQueryMeta;
};

export interface IQueryMeta {
    ranAt?: number;
    durationMs?: number;
    rowCount?: number;
    comms?: string;
}

export type QueryDataContextType = {
    queries: Record<string, Query>;
    setQueries: React.Dispatch<React.SetStateAction<Record<string, Query>>>;
};

export type ActiveQueryContextType = {
    activeQueryId: string;
    setActiveQueryId: (id: string) => void;
};
