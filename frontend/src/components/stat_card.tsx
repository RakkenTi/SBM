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
            class={`animate-slide-up flex flex-col rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-sm transition-all duration-300 select-none hover:-translate-y-0.5 hover:shadow-xl active:scale-95 ${props.class}`}
        >
            <div class="text-slate-500">
                <span
                    class={`text-xs font-bold tracking-widest uppercase ${props.header_classes}`}
                >
                    {props.header}
                </span>
            </div>
            <div class="text-slate-600">
                <span class={`mt-2 text-4xl font-bold ${props.value_classes}`}>
                    {props.value}
                </span>
            </div>
        </div>
    )
}

export default StatCard
