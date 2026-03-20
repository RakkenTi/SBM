import { Accessor, For, JSXElement, Match, Setter, Switch } from 'solid-js'

interface Modal {
    content: JSXElement
}

interface ModalContainerProps<T extends 'NONE' | string> {
    state: Accessor<T>
    stateSetter: Setter<T>
    modals: Array<{
        state_name: T
        content: JSXElement
    }>
}

const ModalContainer = <T extends string>(props: ModalContainerProps<T>) => (
    <div
        onclick={() => props.stateSetter('NONE' as any)}
        class={`fixed inset-0 z-10 flex w-full items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300 ${
            props.state() === 'NONE'
                ? 'pointer-events-none opacity-0'
                : 'pointer-events-auto opacity-100'
        }`}
    >
        <For each={props.modals}>
            {(item) => (
                <Switch>
                    <Match when={props.state() === item.state_name}>
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
                    </Match>
                </Switch>
            )}
        </For>
    </div>
)

export default ModalContainer
