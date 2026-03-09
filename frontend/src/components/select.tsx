import { Component, JSXElement } from 'solid-js'

interface SelectProps {
    name: string
    value: string
    content: JSXElement
}

const Select: Component<SelectProps> = (props) => (
    <select
        value={props.value}
        class="bg-slate-200 hover:bg-slate-300 rounded-lg p-2 text-lg shadow-sm hover:shadow-md"
        name={props.name}
    >
        {props.content}
    </select>
)

export default Select
