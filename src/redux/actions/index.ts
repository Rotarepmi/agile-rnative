import { Column } from "../../utils/Types";

export const tasksFetchSuccess = (columns: Column[]) => {
    return {
        type: "TASKS_FETCH_SUCCESS",
        columns
    }
};