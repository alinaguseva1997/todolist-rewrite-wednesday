import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./Redux/store";
import {addTodolistAC} from "./Redux/todolist-reducer";

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
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

const App = React.memo(() => {
    console.log('app')

    let todolists = useSelector<StoreType, TodolistsType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((newTitle: string) => {
        const newTodolistID = v1()
        dispatch(addTodolistAC(newTitle, newTodolistID))
    },[dispatch])

    return (
        <div className="App">
            <AddItemForm addItemCallback={addTodolist} />
            {todolists.map( t => {
                return (
                    <Todolist todolistID={t.id}
                              key = {t.id}
                              title={t.title}
                              filter = {t.filter}
                    />
                )
            })}

        </div>
    );
})

export default App;
