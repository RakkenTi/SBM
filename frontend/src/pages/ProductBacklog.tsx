import {
    Component,
    createEffect,
    createResource,
    createSignal,
    For,
} from 'solid-js'

import BaseLine from '../components/base_line'

import Select from '../components/select'

import ProductBacklogCard, {
    ProductBacklogCardProps,
} from '../components/backlog_item_card'

import { ProductPageSubpage } from '../globals/client_data'

import states from '../globals/states'

let lastProductName = ''

const [statusFilter, setStatusFilter] = createSignal<
    'ANY' | 'DO' | 'PROGRESS' | 'DONE'
>('ANY')

const [priorityFilter, setPriorityFilter] = createSignal<
    'ANY' | 'HIGH' | 'MEDIUM' | 'LOW'
>('ANY')

const [riskFilter, setRiskFilter] = createSignal<
    'ANY' | 'HIGH' | 'MEDIUM' | 'LOW'
>('ANY')

const [teamFilter, setTeamFilter] = createSignal<'ANY' | string>('ANY')

export const getProductName = () => {
    return lastProductName
}

export let refetchPBL: () => void

const ProductBacklog: Component<ProductPageSubpage> = (props) => {
    lastProductName = props.data?.productName || ''

    const getProductBacklog = () => {
        const data = getProductData()

        return data?.PBLItems
    }

    const [getProductData, { refetch }] = createResource(async () => {
        const response = await fetch(
            `/api/get_product_data?productName=${props.data?.productName}`,
        )

        const result = await response.json()
        return result
    })

    refetchPBL = refetch

    const getBacklogArray = () => {
        const productBacklog: Array<{}> = getProductBacklog()
        if (productBacklog) {
            return productBacklog.map((entry: any) => ({
                name: entry.title,
                description: entry.description,
                priority: entry.priority,
                status: entry.status,
                effort: entry.effort,
            }))
        }
        return []
    }

    return (
        <div class="z-0 flex min-h-screen flex-col">
            <div class="pt-10"></div>

            <BaseLine class="h-1 w-[98%]" />

            <div class="flex items-center gap-6 pt-4 pl-40 font-medium text-slate-600">
                <span class="animate-slide-up text-3xl font-bold text-slate-500 opacity-0">
                    Filters:
                </span>

                <div
                    class="animate-slide-up opacity-0"
                    style={{
                        'animation-delay': '100ms',
                    }}
                >
                    <Select
                        name="Status"
                        value={statusFilter()}
                        content={
                            <>
                                <option value="ANY">Select Status</option>

                                <option value="DO">Todo</option>

                                <option value="PROGRESS">In Progress</option>

                                <option value="DONE">Done</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{
                        'animation-delay': '200ms',
                    }}
                >
                    <Select
                        name="Priority"
                        value={priorityFilter()}
                        content={
                            <>
                                <option value="ANY">Select Priority</option>

                                <option value="HIGH">High</option>

                                <option value="MEDIUM">Medium</option>

                                <option value="LOW">Low</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{
                        'animation-delay': '300ms',
                    }}
                >
                    <Select
                        name="Risk"
                        value={riskFilter()}
                        content={
                            <>
                                <option value="ANY">Select Risk</option>

                                <option value="HIGH">High</option>

                                <option value="MEDIUM">Medium</option>

                                <option value="LOW">Low</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{
                        'animation-delay': '400ms',
                    }}
                >
                    <Select
                        name="Team"
                        value={teamFilter()}
                        content={
                            <>
                                {' '}
                                <option value="ANY">Select Team</option>
                                <option value="TEAM_1">Team 1</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{
                        'animation-delay': '500ms',
                    }}
                >
                    <button class="rounded-lg bg-slate-200 p-2 text-lg shadow-sm hover:-translate-y-0.5 hover:cursor-pointer hover:bg-slate-300 hover:shadow-md active:scale-95">
                        Reset Filters
                    </button>
                </div>
            </div>

            <div class="w-full p-40 pt-10 pb-10">
                <div class="grid grid-cols-4 gap-8">
                    <For each={getBacklogArray()}>
                        {(entry, i) => (
                            <div
                                class="animate-slide-up opacity-0"
                                style={{
                                    'animation-delay': `${i() * 100 + 750}ms`,
                                }}
                            >
                                <ProductBacklogCard {...entry} />
                            </div>
                        )}
                    </For>
                </div>
            </div>

            <div
                class="animate-slide-up pl-40 opacity-0"
                style={{
                    'animation-delay': '1000ms',
                }}
            >
                <button
                    onclick={() => {
                        states.setModal('CREATE_BACKLOG_ENTRY')
                    }}
                    class="z-100 rounded-lg border-2 border-gray-300 bg-blue-500 p-4 text-center font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer hover:shadow-xl active:scale-95 active:duration-50"
                >
                    + Add Backlog Item
                </button>
            </div>
        </div>
    )
}

export default ProductBacklog
