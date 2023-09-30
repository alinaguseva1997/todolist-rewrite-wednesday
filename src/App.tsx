import React from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC
} from "./redux/todolist-reducer";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, deleteTaskAC} from "./redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";

export type TodolistsType = {
    id: string
    title: string
    filter: string
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const todolists = useSelector<RootStateType,TodolistsType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        dispatch(addTodolistAC(newTodolistID, title))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {
                return (
                    <Todolist key={el.id}
                              todolistID={el.id}
                              title={el.title}
                              filter = {el.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
