import React from 'react';
import {TasksType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import s from './Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import { changeFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../../redux/todolist-reducer";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, deleteTaskAC} from "../../redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export type TodolistType = {
    todolistID: string
    title: string
    filter: string
}

export const Todolist = (props: TodolistType) => {

    const tasks = useSelector<RootStateType,TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    // let filteredTasks = tasks
    // if (props.filter === 'active') {
    //     filteredTasks =  filteredTasks.filter(el => !el.isDone)
    // }
    // if (props.filter === 'completed') {
    //     filteredTasks =  filteredTasks.filter(el => el.isDone)
    // }
    const tasksMap = tasks.map(el => {
        const onChangeCheckBoxHandler = (todolistID:string,taskID: string, newIsDone: boolean) => {
            dispatch(changeStatusTaskAC(todolistID,taskID, newIsDone))
        }
        const onClickButtonHandler = (todolistID: string, taskID: string) =>{
            dispatch(deleteTaskAC(todolistID,taskID))
        }
        const changeTaskTitleCallback = (newTitle: string) => {
            dispatch(changeTaskTitleAC(props.todolistID, el.id, newTitle))
        }

        return (
            <li key={el.id} className={el.isDone ? s.isDone : ''}>
                <input onChange={(e)=>onChangeCheckBoxHandler(props.todolistID,el.id,e.currentTarget.checked)} type="checkbox" checked={el.isDone}/>
                <EditableSpan title={el.title} changeTitle={changeTaskTitleCallback}/>
                <button onClick={()=>onClickButtonHandler(props.todolistID,el.id)}>x</button>
            </li>)
    })

    const onClickAllHandler = (todolistID: string,newFilter: string) => {
        dispatch(changeFilterAC(todolistID,newFilter))
    }
    const onClickActiveHandler = (todolistID: string,newFilter: string)=> {
        dispatch(changeFilterAC(todolistID,newFilter))
    }
    const onClickCompletedHandler =(todolistID: string,newFilter: string)=> {
        dispatch(changeFilterAC(todolistID,newFilter))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolistID,title))
    }
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC(props.todolistID))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID,newTitle))
    }
    return (
            <div>
                <div className={s.titleTodolist}>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <button onClick={deleteTodolist}>X</button>
                </div>
                    <AddItemForm addItem = {addTask}/>
                <ul>
                    {tasksMap}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? s.activeFilter : ''}
                            onClick={() =>onClickAllHandler(props.todolistID,'all')}>All</button>
                    <button className={props.filter === 'active' ? s.activeFilter : ''}
                        onClick={()=>onClickActiveHandler(props.todolistID,'active')}>Active</button>
                    <button className={props.filter === 'completed' ? s.activeFilter : ''}
                        onClick={()=>onClickCompletedHandler(props.todolistID,'completed')}>Completed</button>
                </div>
            </div>
    );
};

//не работает фильтрация, и удаление тудулиста