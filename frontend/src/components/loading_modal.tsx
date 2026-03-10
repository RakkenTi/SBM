import { Component } from 'solid-js'

interface LoadingModalProps {
    label: string
}

const LoadingModal: Component<LoadingModalProps> = (props) => {
    return (
        <div class="zow-2xl flex max-w-md items-center gap-4 rounded-4xl border-4 border-gray-200 bg-gray-100 p-8">
            <h1 class="pt-2 pr-4 pb-2 pl-4 text-2xl font-bold">
                {props.label}
            </h1>
            <i class="fa-solid fa-spinner fa-spin text-4xl text-cyan-400"></i>
        </div>
    )
}

export default LoadingModal
