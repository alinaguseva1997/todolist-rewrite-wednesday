import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

export type RootStateType = ReturnType<typeof Reducer>

const Reducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(Reducer)

// @ts-ignore
window.store = store