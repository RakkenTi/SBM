import { Component } from "solid-js";

interface ConfirmModalProps {
    title: string,
    label?: string,
    rejectCallback: () => any,
    acceptCallback: () => any,
}

const ConfirmModal: Component<ConfirmModalProps> = (props) => {
    return (
        <div class="border-4 border-gray-200 shadow-2xl w-lg rounded-4xl bg-gray-100 flex flex-col p-8 gap-4">
            <h1 class="text-center text-xl font-bold pt-4">{props.title || "ACTION NAME"}</h1>
            <p class="text-gray-400 text-center">{props.label || "Proceed with this action?"}</p>
            <div class="flex justify-between pt-4">
                <button onClick={() => props.acceptCallback()} class="p-4 bg-green-400 w-1/3 rounded-2xl bold text-white font-bold hover:shadow-md active:scale-95 hover:-translate-y-1 shadow-sm transition-all hover:cursor-pointer">Confirm</button>
                <button onClick={() => props.rejectCallback()} class="p-4 bg-red-400 w-1/3 rounded-2xl bold text-white font-bold hover:shadow-md active:scale-95 hover:-translate-y-1 shadow-sm transition-all hover:cursor-pointer">Reject</button>
            </div>
        </div>
    )
}

export default ConfirmModal;