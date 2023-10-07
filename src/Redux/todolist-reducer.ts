import {ArrayTasksType, FilterType, TodolistsType} from "../App";

export type ActionType = addTodolistACType | changeTodolistTitleACType | deleteTodolistACType | changeTodolistFilterACType

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistsType[] = []

export const todolistReducer = (state: TodolistsType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist = {id: action.newTodolistID, title: action.newTitle, filter: 'all'}
            return [newTodolist,...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todolistID ? {...el, title: action.newValue}: el)
        }
        case 'DELETE-TODOLIST': {
            return state.filter(el => el.id !==action.todolistID)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.newFilter} : el)
        }
        default: {
            return state;
        }
    }
}

export const addTodolistAC = (newTitle: string, newTodolistID: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        newTitle, newTodolistID
    }
}
export const changeTodolistTitleAC = (todolistID: string, newValue: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        todolistID, newValue
    }
}
export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODOLIST' as const,
        todolistID
    }
}
export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        todolistID, newFilter
    }
}