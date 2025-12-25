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
