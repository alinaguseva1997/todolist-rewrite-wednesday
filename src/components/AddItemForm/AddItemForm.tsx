import React, {ChangeEvent, MouseEvent, useState} from 'react';
import s from './AddItemForm.module.css'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [titleValue, setTitleValue] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
        setError('')
    }

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (titleValue.trim() !== ''){
            props.addItem(titleValue.trim())
            setTitleValue('')
        }
        if (titleValue.trim() === '') {
            setError('Uncorrected title!')
        }
    }
    return (
        <div>
        <div>
            <input className={error && s.error} type="text" value={titleValue} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
            {error && <span className ={s.errorMessage}>{error}</span>}
        </div>
    );
};

