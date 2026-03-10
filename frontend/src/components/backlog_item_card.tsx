import { Component, Show } from 'solid-js'
import BaseLine from './base_line'

export interface ProductBacklogCardProps {
    name: string
    description: string
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    status: 'To Do' | 'In Progress' | 'Done'
    effort: number
    assignee?: string
}

const ProductBacklogCard: Component<ProductBacklogCardProps> = (props) => (
    <div class="animate-slide-up flex flex-col flex-wrap rounded-xl border-2 border-slate-200 bg-gray-200 p-8 font-bold tracking-tight opacity-0 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105">
        <span class="text-2xl text-slate-500">{props.name}</span>
        <span class="text-slate-600">{props.description}</span>
        <div>
            <BaseLine class="h-1 w-full"></BaseLine>
        </div>
        <span class="text-lg">
            <span class="text-slate-800">Priority:</span> {props.priority}
        </span>
        <span class="text-lg">
            <span class="text-slate-800">Status:</span> {props.status}
        </span>
        <span class="text-lg">
            <span class="text-slate-800">Effort:</span> {props.effort}
        </span>
        <Show when={props.assignee}>
            <span class="text-lg">Assignee: {props.assignee}</span>
        </Show>
    </div>
)

export default ProductBacklogCard
