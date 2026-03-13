import {
    Accessor,
    Component,
    createMemo,
    createSignal,
    For,
    JSXElement,
    Setter,
} from 'solid-js'

interface Modal {
    content: JSXElement
}

interface ModalContainerProps {
    state: Accessor<string>
    stateSetter: Setter<any>
    modals: Array<{
        state_name: string
        content: JSXElement
    }>
}

const ModalContainer: Component<ModalContainerProps> = (props) => (
    <div
        onclick={() => props.stateSetter('NONE')}
        class={`fixed inset-0 z-10 flex w-full items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300 ${
            props.state() === 'NONE'
                ? 'pointer-events-none opacity-0'
                : 'pointer-events-auto opacity-100'
        }`}
    >
        <For each={props.modals}>
            {(item) => (
                <div
                    onclick={(e) => e.stopPropagation()}
                    class={`absolute transition-all duration-300 ${
                        props.state() === item.state_name
                            ? 'scale-100 opacity-100'
                            : 'scale-0 opacity-0'
                    } `}
                >
                    {item.content}
                </div>
            )}
        </For>
    </div>
)

export default ModalContainer
