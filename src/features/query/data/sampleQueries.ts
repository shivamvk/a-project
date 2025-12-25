import type { Query } from "../types";

export const sampleQueries: Query[] = [
    {
        id: "q_users_active",
        name: "Active users by plan",
        sql: `
  SELECT
    id,
    name,
    email,
    plan,
    signup_date
  FROM users
  WHERE status = 'active'
  ORDER BY signup_date DESC
  LIMIT 1000;
  `.trim(),
        status: "success",
        result: null,
    },

    {
        id: "q_api_logs",
        sql: `
  SELECT
    timestamp,
    method,
    url,
    status,
    latency_ms
  FROM api_logs
  WHERE status >= 400
  ORDER BY timestamp DESC
  LIMIT 2000;
  `.trim(),
        status: "success",
        result: null,
        name: "API Logs",
    },

    {
        id: "q_orders",
        name: "Recent orders and payments",
        sql: `
  SELECT
    order_id,
    user_id,
    amount,
    status,
    created_at
  FROM orders
  WHERE created_at >= NOW() - INTERVAL '7 days'
  ORDER BY created_at DESC;
  `.trim(),
        status: "success",
        result: null,
    },

    {
        id: "q_errors",
        name: "Service error summary",
        sql: `
  SELECT
    error_code,
    message,
    service,
    severity
  FROM error_events
  ORDER BY severity DESC;
  `.trim(),
        status: "success",
        result: null,
    },
];
