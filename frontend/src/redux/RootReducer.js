import { combineReducers } from "redux"
import { groupsReducer } from "./GroupsReducer"
import { userDataVKReducer } from "./userDataVKReducer"
const rootReducer = combineReducers({
    clean: groupsReducer,
    userDataVK: userDataVKReducer
})

export default rootReducer