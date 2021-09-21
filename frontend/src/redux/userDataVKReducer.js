export const userDataVKReducer = (state = {}, action) => {
    switch(action.type) {
        case "OBTAINED_DATA":
            return action.data
        default: return state
    }
}