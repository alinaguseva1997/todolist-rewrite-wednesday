import React, {ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    callback: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [newValue, setNewValue] = useState(props.title)
    let [update, setUpdate] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value.trim())
        props.callback(newValue)
    }

    const onDoubleClickHandler = (e: MouseEvent<HTMLSpanElement>) => {
        setUpdate(true)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setUpdate(false)
            props.callback(newValue)
        }
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setUpdate(false)
        props.callback(newValue)
    }

    return (
        <>
            {update ?
                 <input type="text" value={newValue} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} onBlur={onBlurHandler} autoFocus/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
};

