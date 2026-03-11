import { Component, JSXElement } from 'solid-js'

interface textboxProps {
    label: string
    placeholder: string
}

const Textbox: Component<textboxProps> = (props) => (
    <div class="animate-slide-up flex w-full justify-between rounded-lg border border-gray-300 bg-slate-400 p-2 pr-4 pl-4 text-left font-semibold tracking-tight text-slate-600 opacity-0">
        <span class="pr-2">{props.label}</span>
        <input
            placeholder={props.placeholder}
            type="text"
            class="float-right text-right"
        ></input>
    </div>
)

export default Textbox
