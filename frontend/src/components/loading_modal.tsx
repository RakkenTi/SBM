import { Component } from 'solid-js'

interface LoadingModalProps {
    label: string
}

const LoadingModal: Component<LoadingModalProps> = (props) => {
    return (
        <div class="border-4 border-gray-200 max-w-md rounded-4xl bg-gray-100 flex items-center p-8 gap-4 zow-2xl">
            <h1 class="text-2xl font-bold pl-4 pr-4 pt-2 pb-2">
                {props.label}
            </h1>
            <i class="fa-solid fa-spinner text-4xl text-cyan-400 fa-spin"></i>
        </div>
    )
}

export default LoadingModal
