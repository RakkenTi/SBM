import { Component } from 'solid-js'

interface ConfirmModalProps {
    title: string
    label?: string
    rejectCallback: () => any
    acceptCallback: () => any
}

const ConfirmModal: Component<ConfirmModalProps> = (props) => {
    return (
        <div class="flex w-xs flex-col gap-4 rounded-4xl border-4 border-gray-200 bg-gray-100 p-8 shadow-2xl md:w-lg">
            <h1 class="pt-4 text-center text-xl font-bold">
                {props.title || 'ACTION NAME'}
            </h1>
            <p class="text-center text-gray-400">
                {props.label || 'Proceed with this action?'}
            </p>
            <div class="flex justify-between pt-4">
                <button
                    onClick={() => props.acceptCallback()}
                    class="bold w-1/3 rounded-2xl bg-green-400 p-3 font-bold text-white shadow-sm transition-all hover:-translate-y-1 hover:cursor-pointer hover:shadow-md active:scale-95 md:p-4"
                >
                    Confirm
                </button>
                <button
                    onClick={() => props.rejectCallback()}
                    class="bold w-1/3 rounded-2xl bg-red-400 p-3 font-bold text-white shadow-sm transition-all hover:-translate-y-1 hover:cursor-pointer hover:shadow-md active:scale-95 md:p-4"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}

export default ConfirmModal
