import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import {elGR} from "@mui/material/locale";

export type ArrayTasksType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const addTodolist = (newTitle: string) => {
        const newTodolistID = v1()
        const newTodolist = {id: newTodolistID, title: newTitle, filter: 'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolistID]: []})
    }
    const changeTodolistTitle = (todolistID: string, newValue: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newValue}: el))
    }

    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !==todolistID))
    }

    const addTask = (todolistID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeTaskTitle = (todolistID: string, taskID: string, newValue: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newValue} : el)})
    }
    const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)})
    }
    const deleteTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    return (
        <div className="App">
            <AddItemForm addItemCallback={addTodolist} />
            {todolists.map( t => {
                const changeTodolistFilter = (todolistID: string, newFilter: FilterType) => {
                }

                return (
                    <Todolist todolistID={t.id}
                              title={t.title}
                              tasks={tasks[t.id]}
                              addTask={addTask}
                              changeTodolistTitle = {changeTodolistTitle}
                              changeTaskTitle = {changeTaskTitle}
                              changeTaskStatus = {changeTaskStatus}
                              deleteTask = {deleteTask}
                              deleteTodolist = {deleteTodolist}
                              changeTodolistFilter = {changeTodolistFilter}
                    />
                )
            })}

        </div>
    );
}

export default App;
