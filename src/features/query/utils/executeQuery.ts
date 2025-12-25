import { QUERY_EXECUTION_FAILURE_RATE } from "../constants";
import type { Query } from "../types";
import { getRandomResult } from "./resultProfiles";

export const executeQuery = async (): Promise<Query["result"]> => {
    await new Promise((res) => setTimeout(res, 600));

    if (Math.random() < QUERY_EXECUTION_FAILURE_RATE) {
        throw new Error("Oops! Something went wrong. Please try again!");
    }
    return getRandomResult();
};

// [TODO] when user clicks on new query, auto focus on the editor
// [TODO] runid impl, if user clicks run twice, show the results from latest run
// [TODO] sorting, searching
// [TODO] exporting the data as csv
