const initialState = { columns: [] };

export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case "TASKS_FETCH_SUCCESS":
            return {
                ...state,
                columns: [...action.columns],
            }
        case "UPDATE_TASKS_LIST":
            return {
                ...state,
                columns: [...action.columns],
            }
        default:
            return state
    }
}