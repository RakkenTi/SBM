import { Component } from 'solid-js'

interface LineProps {
    class?: string
}

const Line: Component<LineProps> = (props) => (
    <div
        class={`animate-expand-x mx-auto mt-6 h-1.5 w-1/4 rounded-full bg-cyan-500 transition-all md:w-1/12 ${props.class}`}
    ></div>
)
export default Line
