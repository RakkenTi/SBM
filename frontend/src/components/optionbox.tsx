import { Component, JSXElement } from 'solid-js'
import Select from './select'

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

const OptionBox: Component<inputboxProps> = (props) => (
    <div class="animate-slide-up flex w-full justify-between rounded-lg border border-gray-300 bg-slate-400 p-2 pr-4 pl-4 text-left font-semibold tracking-tight text-slate-600 opacity-0">
        <span class="pr-2">{props.label}</span>
        <Select
            name="d"
            value=""
            content={
                <>
                    <option>Test value</option>
                </>
            }
        ></Select>
    </div>
)

export default OptionBox
