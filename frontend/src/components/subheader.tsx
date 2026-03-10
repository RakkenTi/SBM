import { Component } from 'solid-js'

interface SubHeaderProps {
    label: string
    class?: string
}

const SubHeader: Component<SubHeaderProps> = (props) => (
    <h1
        class={`p-4 pt-10 text-center text-4xl font-bold tracking-wide text-slate-700 ${props.class}`}
    >
        {props.label}
    </h1>
)

export default SubHeader
