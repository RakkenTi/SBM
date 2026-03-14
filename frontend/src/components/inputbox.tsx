import { Component, JSXElement } from 'solid-js'
import InputFrame from './inputframe'

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

interface inputboxProps {
    label: string
    placeholder: string
    type: ValidInputType
}

const InputBox: Component<inputboxProps> = (props) => (
    <InputFrame content=
    {(<>       
        <span class="pr-2">{props.label}</span>
        <input
            placeholder={props.placeholder}
            type={props.type}
            class="float-right pr-4 text-right"
        ></input></>
    )}
    />
)

export default InputBox
