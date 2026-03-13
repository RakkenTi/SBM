import { Component, JSXElement } from 'solid-js'

interface SelectProps {
    name: string
    value: string
    content: JSXElement
}

const Select: Component<SelectProps> = (props) => (
    <select
        value={props.value}
        class="rounded-lg bg-slate-200 p-2 text-lg shadow-sm hover:bg-slate-300 hover:shadow-md"
        name={props.name}
    >
        {props.content}
    </select>
)

export default Select
