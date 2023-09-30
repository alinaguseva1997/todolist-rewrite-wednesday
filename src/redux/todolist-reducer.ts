import {TodolistsType} from "../App";
import {v1} from "uuid";

export type ActionType = changeFilterACType | addTodolistACType | deleteTodolistACType | changeTodolistTitleACType

export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

const initialState: TodolistsType[] = []

export const todolistReducer = (state: TodolistsType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE-FILTER-TODOLIST' : {
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.newFilter} : el)
        }
        case 'ADD-TODOLIST' : {
            const newTodolist = {id: action.payload.newTodolistID, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'DELETE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return  state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        }
    }
    return state;
}

export const changeFilterAC = (todolistID: string, newFilter: string) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            todolistID, newFilter
        }
    } as const
}
export const addTodolistAC = (newTodolistID: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistID,title
        }
    } as const
}
export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID, newTitle
        }
    } as const
}
