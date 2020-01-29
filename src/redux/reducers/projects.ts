const initialState = {
    activeProject: undefined
}

export const projects = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_PROJECT":
            return {
                activeProject: action.projectId,
            }
        default:
            return state
    }
}