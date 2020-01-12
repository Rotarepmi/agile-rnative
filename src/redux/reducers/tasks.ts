export const tasks = (state = { columns: [] }, action) => {
    switch (action.type) {
        case "TASKS_FETCH_SUCCESS":
            return {
                columns: [...action.columns],
            }
        default:
            return state
    }
}