import { Component } from 'solid-js'

interface StatCardProps {
    header: string
    header_classes?: string
    value: string
    value_classes?: string
    class?: string
}

const StatCard: Component<StatCardProps> = (props) => {
    return (
        <div
            class={`animate-slide-up transition-all duration-300 active:scale-95 hover:-translate-y-0.5 hover:shadow-xl bg-white p-6 rounded-2xl select-none shadow-sm border-2 border-gray-300 flex flex-col ${props.class}`}
        >
            <div class="text-slate-500">
                <span
                    class={`text-xs font-bold uppercase tracking-widest ${props.header_classes}`}
                >
                    {props.header}
                </span>
            </div>
            <div class="text-slate-600">
                <span class={`text-4xl font-bold mt-2 ${props.value_classes}`}>
                    {props.value}
                </span>
            </div>
        </div>
    )
}

export default StatCard
