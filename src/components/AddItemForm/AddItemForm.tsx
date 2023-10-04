import React, {ChangeEvent, MouseEvent, useState} from 'react';
import s from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    addItemCallback: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (title.trim() !== '') {
            props.addItemCallback(title)
            setTitle('')
        }
        if (!title.trim()) {
            setError(true)
        }
    }

    return (
        <div>
            <div>
                <input className={error ? s.errorInput : ''} value={title} onChange={onChangeHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            {error && <span className={s.error}>Title is false!</span>}
        </div>
    );
};

