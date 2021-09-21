export const groupsReducer = (state = false, action) => {
    switch(action.type) {
        case "CLEAN_FAVORITES_GROUPS":
            return !state
        default: return state
    }
}