import { Accessor, Component } from "solid-js";

interface NavButtonProps {
    label: string,
    icon: string,
    selected: Accessor<string>,
    callback: () => any
}

const NavButton: Component<NavButtonProps> = (props) => {
    return (
        <div onClick={props.callback} class="group transition-all duration-300 active:scale-95 hover:cursor-pointer hover:-translate-y-0.5 flex flex-col">
            <div class="font-bold text-lg text-gray-700 rounded-xl">{props.label}</div>
            <div class="flex w-full justify-center">
                <div class={`transition-all duration-300 p-0.5 bg-gray-800 rounded-full ${
                        props.selected() === props.label ? "opacity-100 w-1/2" : "w-0 opacity-0 group-hover:opacity-100 group-hover:w-1/3"
                    }`}></div>
            </div>
        </div>
    )
}

export default NavButton