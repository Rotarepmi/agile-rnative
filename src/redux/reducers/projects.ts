const initialState = {
    activeProject: undefined
}

export const projects = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_PROJECT":
            return {
                ...state,
                activeProject: action.payload.project,
            }
        default:
            return state
    }
}