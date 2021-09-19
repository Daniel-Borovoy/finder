import { combineReducers } from "redux"
import { groupsReducer } from "./GroupsReducer"
import { vkDataReducer } from "./vkDataReducer"
const rootReducer = combineReducers({
    clean: groupsReducer,
    dataVK: vkDataReducer
})

export default rootReducer