import { Component } from 'solid-js'

interface LineProps {
    class?: string
}

const BaseLine: Component<LineProps> = (props) => (
    <div
        class={`transition-all animate-expand-x bg-cyan-500 mx-auto mt-6 rounded-full ${props.class}`}
    ></div>
)
export default BaseLine
