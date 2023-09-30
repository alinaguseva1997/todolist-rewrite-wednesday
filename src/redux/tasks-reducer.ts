import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, deleteTodolistACType} from "./todolist-reducer";

export type ActionType = changeStatusTaskACType | deleteTaskACType | addTaskACType | addTodolistACType | deleteTodolistACType | changeTaskTitleACType

export type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE-STATUS-TASK' : {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {...el, isDone: action.payload.newIsDone} : el)}
        }
        case 'DELETE-TASK' : {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID)}
        }
        case 'ADD-TASK' : {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'ADD-TODOLIST' : {
            return {[action.payload.newTodolistID]: [], ...state}
        }
        case 'DELETE-TODOLIST' : {
            return delete state[action.payload.todolistID]
        }
        case 'CHANGE-TASK-TITLE' : {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el=> el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)}
        }
    }
    return state;
}

export const changeStatusTaskAC = (todolistID: string, taskID: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todolistID, taskID, newIsDone
        }
    } as const
}
export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todolistID, taskID
        }
    } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
        return {
            type: 'ADD-TASK',
            payload: {
                todolistID, title
            }
        } as const
    }
export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
        return {
            type: 'CHANGE-TASK-TITLE',
            payload: {
                todolistID, taskID, newTitle
            }
        } as const
    }