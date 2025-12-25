import type { Query } from "../types";

export const mockQueries: Record<string, Query> = {
    "query-1": {
        id: "query-1",
        name: "Query 1",
        sql: "SELECT * FROM users",
        result: null,
    },
    "query-2": {
        id: "query-2",
        name: "Query 2",
        sql: "SELECT * FROM posts",
        result: null,
    },
    "query-3": {
        id: "query-3",
        name: "Query 3",
        sql: "SELECT * FROM comments",
        result: null,
    },
    "query-4": {
        id: "query-4",
        name: "Query 4",
        sql: "SELECT * FROM tags",
        result: null,
    },
    "query-5": {
        id: "query-5",
        name: "Query 5",
        sql: "SELECT * FROM categories",
        result: null,
    },
};
