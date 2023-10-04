import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from './Todolist.module.css'

export type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    addTask: (todolistID: string, title: string)=> void
    changeTodolistTitle: (todolistID: string, newValue: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newValue: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDone: boolean) => void
    deleteTask: (todolistID: string, taskID: string) => void
    deleteTodolist: (todolistID: string) => void
    changeTodolistFilter: (todolistID: string, filterName: FilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const addItemCallback = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const changeTodolistTitleCallback = (newValue: string) => {
        props.changeTodolistTitle(props.todolistID, newValue)
    }

    const onDeleteTodolistHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.deleteTodolist(props.todolistID)
    }

    const onClickAllHandler = (filterName: FilterType) => {
        props.changeTodolistFilter(props.todolistID,filterName)
    }
    const onClickActiveHandler = (filterName: FilterType) => {
        props.changeTodolistFilter(props.todolistID,filterName)
    }
    const onClickCompletedHandler = (filterName: FilterType) => {
        props.changeTodolistFilter(props.todolistID,filterName)
    }

    const tasksMap = props.tasks.map((el)=>{

        const changeTaskTitleCallback = (newValue: string) => {
            props.changeTaskTitle(props.todolistID, el.id, newValue)
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, el.id, e.currentTarget.checked)
        }
        const onClickDeleteTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.deleteTask(props.todolistID, el.id)
        }

        return (
            <li key={el.id}>
                <input onChange={onChangeStatusHandler} type="checkbox" checked={el.isDone}/>
                <EditableSpan title={ el.title } callback={ changeTaskTitleCallback } />
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
};
