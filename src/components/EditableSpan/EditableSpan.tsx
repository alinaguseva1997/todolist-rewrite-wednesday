import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from 'react';

export type  EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [newTitle, setNewTitle] = useState(props.title)
    let [collapsed, setCollapsed] = useState(false)

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        props.changeTitle(newTitle)
        setCollapsed(false)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
        props.changeTitle(newTitle)
            setCollapsed(false)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setCollapsed(true)
    }

    const onDoubleClickHandler = () => {
        setCollapsed(true)
    }
    return (
        <>
            {collapsed ?
                <input onKeyDown={onEnterHandler} onBlur={onBlurHandler} value={newTitle}
                       onChange={onChangeHandler} type="text" autoFocus/>
                : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

            }
        </>
    );
};

