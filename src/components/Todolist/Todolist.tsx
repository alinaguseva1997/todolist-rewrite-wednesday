import React, {ChangeEvent, MouseEvent, useCallback} from 'react';
import {ArrayTasksType, FilterType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from './Todolist.module.css'
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../Redux/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../Redux/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../../Redux/todolist-reducer";

export type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterType
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('todolist')


    let tasks = useSelector<StoreType, ArrayTasksType>(state => state.tasks)
    const dispatch = useDispatch()


    const addItemCallback = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistID, title))
    },[dispatch])

    const changeTodolistTitleCallback = (newValue: string) => {
       dispatch(changeTodolistTitleAC(props.todolistID, newValue))
    }

    const onDeleteTodolistHandler = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteTodolistAC(props.todolistID))
    }

    const onClickAllHandler = (filterName: FilterType) => {
        dispatch(changeTodolistFilterAC(props.todolistID,filterName))
    }
    const onClickActiveHandler = (filterName: FilterType) => {
        dispatch(changeTodolistFilterAC(props.todolistID,filterName))
    }
    const onClickCompletedHandler = (filterName: FilterType) => {
        dispatch(changeTodolistFilterAC(props.todolistID,filterName))
    }

    let filteredTasks = tasks[props.todolistID]
    if (props.filter === 'active') {
        filteredTasks = tasks[props.todolistID].filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = tasks[props.todolistID].filter(el => el.isDone)
    }

    const changeTaskTitleCallback = useCallback((newValue: string, taskID: string) => {
        dispatch(changeTaskTitleAC(props.todolistID, taskID, newValue))
    },[dispatch])

    const tasksMap = filteredTasks.map((el)=>{
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(props.todolistID, el.id, e.currentTarget.checked))
        }
        const onClickDeleteTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
            dispatch(deleteTaskAC(props.todolistID, el.id))
        }

        return (
            <li key={el.id}>
                <input onChange={onChangeStatusHandler} type="checkbox" checked={el.isDone}/>
                <EditableSpan title={ el.title } callback={(newValue) => changeTaskTitleCallback(newValue,el.id) } />
                <button onClick={onClickDeleteTaskHandler}>X</button>
            </li>
        )
    })
    return (
        <div>
            <div className={s.box}>
                <h3 className={s.title}><EditableSpan title={props.title} callback={changeTodolistTitleCallback}/></h3>
                <button className={s.button} onClick={onDeleteTodolistHandler}>X</button>
            </div>
            <div>
                <AddItemForm addItemCallback = {addItemCallback}/>
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button onClick={()=>onClickAllHandler('all')}>All</button>
                <button onClick={()=>onClickActiveHandler('active')}>Active</button>
                <button onClick={()=>onClickCompletedHandler('completed')}>Completed</button>
            </div>
        </div>
    );
})
