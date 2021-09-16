const initialState = false;
export const groupsReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CLEAN_FAVORITES_GROUPS":
            return !state
        default: return state
    }
}