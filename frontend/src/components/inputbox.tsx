import { Component, JSXElement } from 'solid-js'

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
    <div class="animate-slide-up flex w-full justify-between rounded-lg border border-gray-300 bg-slate-400 p-2 pr-4 pl-4 text-left font-semibold tracking-tight text-slate-600 opacity-0">
        <span class="pr-2">{props.label}</span>
        <input
            placeholder={props.placeholder}
            type={props.type}
            class="float-right pr-4 text-right"
        ></input>
    </div>
)

export default InputBox
