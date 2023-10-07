import {ArrayTasksType} from "../App";
import {addTodolistACType, deleteTodolistACType} from "./todolist-reducer";
import {v1} from "uuid";

export type ActionType = addTodolistACType | deleteTodolistACType | addTaskACType | changeTaskTitleACType | changeTaskStatusACType | deleteTaskACType

export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type deleteTaskACType = ReturnType<typeof deleteTaskAC>

const initialState: ArrayTasksType = {}

export const tasksReducer = (state: ArrayTasksType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state,[action.newTodolistID]: []}
        }
        case 'DELETE-TODOLIST': {
            delete state[action.todolistID]
            return {...state}
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.newTitle, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, title: action.newValue} : el)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, isDone: action.newIsDone} : el)}
        }
        case 'DELETE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        }
        default: {
            return state;
        }
    }
}

export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK' as const,
        todolistID, newTitle
    }
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, newValue: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistID, taskID, newValue
    }
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        todolistID, taskID, newIsDone
    }
}
export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE-TASK' as const,
        todolistID, taskID
    }
}