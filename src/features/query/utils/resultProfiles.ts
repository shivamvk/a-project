import { QUERY_EXECUTION_EMPTY_RESULTS_RATE } from "../constants";
import type { Results } from "../types";

type ResultProfile = () => Results;

function generateUsersResult(): Results {
    const columns = ["id", "name", "email", "plan", "signup_date"];

    if (Math.random() < QUERY_EXECUTION_EMPTY_RESULTS_RATE) {
        return { columns, rows: [] };
    }

    const rows = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        plan: ["Free", "Pro", "Enterprise"][i % 3],
        signup_date: `2024-0${(i % 9) + 1}-15`,
    }));

    return { columns, rows };
}

function generateApiLogsResult(): Results {
    const columns = ["timestamp", "method", "url", "status", "latency_ms"];

    if (Math.random() < QUERY_EXECUTION_EMPTY_RESULTS_RATE) {
        return { columns, rows: [] };
    }

    const methods = ["GET", "POST", "PUT", "DELETE"];
    const statuses = [200, 201, 400, 401, 403, 404, 500];

    const rows = Array.from({ length: 2000 }, (_, i) => ({
        timestamp: Date.now(),
        method: methods[i % methods.length],
        url: `/api/v1/resource/${i % 50}`,
        status: statuses[i % statuses.length],
        latency_ms: Math.floor(Math.random() * 800) + 50,
    }));

    return { columns, rows };
}

function generateOrdersResult(): Results {
    const columns = ["order_id", "user_id", "amount", "status", "created_at"];

    if (Math.random() < QUERY_EXECUTION_EMPTY_RESULTS_RATE) {
        return { columns, rows: [] };
    }

    const statuses = ["PENDING", "COMPLETED", "FAILED"];

    const rows = Array.from({ length: 1500 }, (_, i) => ({
        order_id: `ORD-${10000 + i}`,
        user_id: (i % 500) + 1,
        amount: (Math.random() * 5000).toFixed(2),
        status: statuses[i % statuses.length],
        created_at: `2024-01-${(i % 28) + 1}`,
    }));

    return { columns, rows };
}

export const resultProfiles: ResultProfile[] = [
    generateUsersResult,
    generateApiLogsResult,
    generateOrdersResult,
];

function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function getRandomResult(): Results {
    const profile = resultProfiles[randomInt(resultProfiles.length)];
    return profile();
}
