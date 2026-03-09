import { Component } from 'solid-js'

interface LineProps {
    class?: string
}

const Line: Component<LineProps> = (props) => (
    <div
        class={`transition-all animate-expand-x h-1.5 w-1/4 md:w-1/12 bg-cyan-500 mx-auto mt-6 rounded-full ${props.class}`}
    ></div>
)
export default Line
