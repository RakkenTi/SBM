import { Component, JSXElement, splitProps } from 'solid-js'
import InputFrame from './inputframe'
import { JSX } from 'solid-js/h/jsx-runtime'

type ValidInputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

interface inputboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const InputBox: Component<inputboxProps> = (props) => {
    const [_, others] = splitProps(props, ['label'])

    return (
        <InputFrame
            content={
                <>
                    <span class="pr-2">{props.label}</span>
                    <input
                        {...(others as any)}
                        class="float-right pr-4 text-right"
                    ></input>
                </>
            }
        />
    )
}

export default InputBox
