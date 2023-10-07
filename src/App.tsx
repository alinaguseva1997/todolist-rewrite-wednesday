import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./Redux/store";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "./Redux/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./Redux/tasks-reducer";

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

    let todolists = useSelector<StoreType, TodolistsType[]>(state => state.todolists)
    let tasks = useSelector<StoreType, ArrayTasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        const newTodolistID = v1()
        dispatch(addTodolistAC(newTitle, newTodolistID))
    }
    const changeTodolistTitle = (todolistID: string, newValue: string) => {
        dispatch(changeTodolistTitleAC(todolistID,newValue))
    }

    const deleteTodolist = (todolistID: string) => {
        dispatch(deleteTodolistAC(todolistID))
    }

    const changeTodolistFilter = (todolistID: string, newFilter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, newFilter))
    }

    const addTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID,newTitle))
    }
    const changeTaskTitle = (todolistID: string, taskID: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newValue))
    }
    const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, newIsDone))
    }
    const deleteTask = (todolistID: string, taskID: string) => {
        dispatch(deleteTaskAC(todolistID, taskID))
    }

    return (
        <div className="App">
            <AddItemForm addItemCallback={addTodolist} />
            {todolists.map( t => {
                let filteredTasks = tasks[t.id]
                    if (t.filter === 'active') {
                        filteredTasks = tasks[t.id].filter(el => !el.isDone)
                    }
                    if (t.filter === 'completed') {
                        filteredTasks = tasks[t.id].filter(el => el.isDone)
                    }

                return (
                    <Todolist todolistID={t.id}
                              title={t.title}
                              tasks={filteredTasks}
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
