import { combineReducers } from "redux";
import { groupsReducer } from "./GroupsReducer";

const rootReducer = combineReducers({
    clean: groupsReducer
});

export default rootReducer;