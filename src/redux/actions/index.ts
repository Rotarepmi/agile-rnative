import { Column } from "../../utils/Types";

export const tasksFetchSuccess = (columns: Column[]) => {
    return {
        type: "TASKS_FETCH_SUCCESS",
        columns
    }
};

export const updateTasksList = (columns: Column[]) => {
    return {
        type: "UPDATE_TASKS_LIST",
        columns
    }
};