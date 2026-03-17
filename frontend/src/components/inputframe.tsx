import { Component, JSXElement } from "solid-js"

interface inputFrameProps {
    content: JSXElement
}

const InputFrame: Component<inputFrameProps> = (props) => (
    <div class="animate-slide-up flex w-full justify-between rounded-lg border border-gray-300 bg-slate-300 p-2 pr-4 pl-4 text-left font-semibold tracking-tight text-slate-600 opacity-0">
        {props.content}
    </div>
)

export default InputFrame