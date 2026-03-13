import { Accessor, Component } from 'solid-js'

interface NavButtonProps {
    label: string
    icon: string
    selected: Accessor<string>
    callback: () => any
}

const NavButton: Component<NavButtonProps> = (props) => {
    return (
        <div
            onClick={props.callback}
            class="group flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer active:scale-95"
        >
            <div class="rounded-xl font-bold text-gray-700 md:text-lg">
                {props.label}
            </div>
            <div class="flex w-full justify-center">
                <div
                    class={`rounded-full bg-gray-800 p-0.5 transition-all duration-300 ${
                        props.selected() === props.label
                            ? 'w-1/2 opacity-100'
                            : 'w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-100'
                    }`}
                ></div>
            </div>
        </div>
    )
}

export default NavButton
