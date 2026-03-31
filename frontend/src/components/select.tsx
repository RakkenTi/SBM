import { Component, ComponentProps, JSXElement } from 'solid-js'

interface SelectProps extends ComponentProps<'select'> {
    name: string
    value: string
    content: JSXElement
}

const Select: Component<SelectProps> = (props) => (
    <select
        {...props}
        class="rounded-lg bg-slate-200 p-2 text-lg shadow-sm hover:bg-slate-300 hover:shadow-md"
    >
        {props.content}
    </select>
)

export default Select
