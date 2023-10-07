import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";
import {ArrayTasksType} from "../App";

let todolistID1: string
let todolistID2: string
let startState: ArrayTasksType

beforeEach(()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState = {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    }
})

test('corrected should be added task', ()=> {

    const endState = tasksReducer(startState, addTaskAC(todolistID1,'jss'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'jss', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
})

test('corrected should be changed title for task', ()=> {

    const endState = tasksReducer(startState, changeTaskTitleAC( todolistID1, '1', 'jest'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', title: 'jest', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    })
})
test('corrected should be changed status for task', ()=> {

    const endState = tasksReducer(startState, changeTaskStatusAC( todolistID1, '1', false))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', title: 'jest', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    })
})
test('corrected should be deleted task', ()=> {

    const endState = tasksReducer(startState, deleteTaskAC( todolistID1, '1'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
    })
})

