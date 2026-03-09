import { Component } from "solid-js";

interface StatCardProps {
    header: string,
    header_classes?: string,
    value: string
    value_classes?: string,
}

const StatCard: Component<StatCardProps> = (props) => {
    return (
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <div class="text-slate-500">
                <span class={`text-xs font-bold uppercase tracking-widest ${props.header_classes}`}>{props.header}</span>
            </div>
            <div class="text-slate-600">
                <span class={`text-4xl font-bold mt-2 ${props.value_classes}`}>{props.value}</span>
            </div>
        </div>
    )
}

export default StatCard