import { Component } from 'solid-js'

interface SubHeaderProps {
    label: string
    class?: string
}

const SubHeader: Component<SubHeaderProps> = (props) => (
    <h1
        class={`pt-10 p-4 text-4xl text-slate-700 text-center font-bold tracking-wide ${props.class}`}
    >
        {props.label}
    </h1>
)

export default SubHeader
