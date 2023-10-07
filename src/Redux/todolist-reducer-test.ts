import {v1} from "uuid";
import {ArrayTasksType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistID1: string
let todolistID2: string
let startState: TodolistsType[]

beforeEach(()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistsType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})

test('corrected should be added todolist', ()=> {
    const newTodolistID = v1()

    const endState: TodolistsType[] = todolistReducer(startState,addTodolistAC('gogo', newTodolistID))

    expect(endState.length).toBe(3)
})

test('corrected should be changed title for todolist', ()=> {

    const endState: TodolistsType[] = todolistReducer(startState, changeTodolistTitleAC(todolistID2, 'gogo'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('gogo')
})

test('corrected should be deleted todolist', ()=> {

    const endState: TodolistsType[] = todolistReducer(startState, deleteTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[1].id).toBe(todolistID2)
})

test('corrected should be changed filter for todolist', ()=> {
    const endState: TodolistsType[] = todolistReducer(startState, changeTodolistFilterAC(todolistID2, 'completed'))

    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
})
