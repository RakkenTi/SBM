import { Component, ComponentProps } from 'solid-js'

interface GenericButtonProps extends ComponentProps<'button'> {
    onClick: () => any
    background_color_classes?: string
    text_colour_classes?: string
}

const GenericButton: Component<GenericButtonProps> = (props) => (
    <div
        class="animate-slide-up opacity-0"
        style={{
            'animation-delay': '1000ms',
        }}
    >
        <button
            onclick={props.onClick}
            class={`rounded-lg border-2 border-gray-300 ${props.background_color_classes || 'bg-green-300'} p-4 text-center font-semibold tracking-tight ${props.text_colour_classes || 'text-white'} shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer hover:shadow-xl active:scale-95 active:duration-50`}
        >
            {props.children}
        </button>
    </div>
)

export default GenericButton
