import { Component, JSXElement, splitProps } from 'solid-js'
import InputFrame from './inputframe'
import { JSX } from 'solid-js/h/jsx-runtime'

interface inputboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const InputBox: Component<inputboxProps> = (props) => {
    const [_, others] = splitProps(props, ['label'])

    return (
        <InputFrame
            content={
                <>
                    <span class="pr-2">{props.label}</span>
                    <input
                        {...(others as any)}
                        class="float-right pr-4 text-right"
                    ></input>
                </>
            }
        />
    )
}

export default InputBox
