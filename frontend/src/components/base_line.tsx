import { Component } from 'solid-js'

interface LineProps {
    class?: string
}

const BaseLine: Component<LineProps> = (props) => (
    <div
        class={`animate-expand-x mx-auto mt-3 mb-3 rounded-full bg-cyan-500 transition-all ${props.class}`}
    ></div>
)
export default BaseLine
