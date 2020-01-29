import { combineReducers } from "redux";
import { tasks } from "./tasks";
import { projects } from "./projects";

const reducers = combineReducers({
    tasks, projects
});

export default reducers;