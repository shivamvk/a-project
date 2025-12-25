import type { Query } from "../../types";
import { timeAgo } from "../../utils/timeHelpers";

export const createHistoryTitle = (query: Query) => {
    const queryRanAt = query.meta?.ranAt;
    if (queryRanAt) {
        return `${query.name} • ${timeAgo(queryRanAt)}`;
    }

    return `${query.name};`;
};
