export const vkDataReducer = (state = {}, action) => {
    switch(action.type) {
        case "DATA_RECEIVED":
            return action.dataVK
        default: return state
    }
}