import {
    Component,
    createResource,
    createSignal,
    createEffect,
    For,
    Show,
} from 'solid-js'
import BaseLine from '../components/base_line'
import Select from '../components/select'
import ProductBacklogCard, {
    ProductBacklogCardProps,
} from '../components/backlog_item_card'
import { ProductPageSubpage } from '../globals/client_data'
import states from '../globals/states'

// --- Import from the Global Store ---
import {
    globalActiveSprintId,
    setGlobalActiveSprintId,
    setGlobalSprintRefetch,
} from '../globals/store'

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

const SprintBacklog: Component<ProductPageSubpage> = (props) => {
    // --- Auto-select the first sprint if one isn't selected yet ---
    createEffect(() => {
        const sprints = props.data?.Sprints
        // If there is no active sprint ID, AND we have at least one sprint in the data
        if (!globalActiveSprintId() && sprints && sprints.length > 0) {
            // Set the global store to the very first sprint's ID
            setGlobalActiveSprintId((sprints[0] as any)._id)
        }
    })

    // Resource automatically refetches whenever globalActiveSprintId changes
    const [getSprintData, { refetch }] = createResource(
        globalActiveSprintId,
        async (sprintId) => {
            if (!sprintId || sprintId === 'ANY') return null

            const response = await fetch(
                `/api/get_sprint_data?sprintId=${sprintId}`,
                {
                    credentials: 'include',
                },
            )

            if (!response.ok) throw new Error('Fetch failed')
            return await response.json()
        },
    )

    // Save this specific refetch function to the global store so modals can trigger it!
    createEffect(() => {
        setGlobalSprintRefetch(() => refetch)
    })

    // Derived signal applying filters to the sprint's 'tasks' array
    const sprintBacklogEntries = () => {
        const data = getSprintData()

        if (!data || !data.tasks) return []

        return data.tasks
            .filter((item: any) => {
                const sMatch =
                    statusFilter() === 'ANY' || item.status === statusFilter()
                const pMatch =
                    priorityFilter() === 'ANY' ||
                    item.priority === priorityFilter()
                const rMatch =
                    riskFilter() === 'ANY' || item.risk === riskFilter()
                return sMatch && pMatch && rMatch
            })
            .map((item: any) => ({
                name: item.title,
                description: item.description,
                priority: item.priority,
                status: item.status,
                effort: item.effort,
                assignee: item.assignee || 'Unassigned',
            }))
    }

    const resetFilters = () => {
        setStatusFilter('ANY')
        setPriorityFilter('ANY')
        setRiskFilter('ANY')
        setTeamFilter('ANY')
    }

    return (
        <div class="z-0 flex min-h-screen flex-col">
            <div class="pt-10"></div>

            {/* Sprint Selector */}
            <div class="flex items-center justify-center">
                <div class="w-[98%] font-semibold">
                    <div class="float-right flex flex-row items-center justify-center gap-4 text-xl">
                        <h1>View Sprint:</h1>
                        <Select
                            name="Sprint"
                            value={globalActiveSprintId()}
                            onInput={(e) =>
                                setGlobalActiveSprintId(e.currentTarget.value)
                            }
                            content={
                                <>
                                    {/* Only show the "Select" placeholder if there are NO sprints */}
                                    <Show
                                        when={
                                            !props.data?.Sprints ||
                                            props.data?.Sprints.length === 0
                                        }
                                    >
                                        <option value="">
                                            No Sprints Available
                                        </option>
                                    </Show>

                                    <For each={props.data?.Sprints}>
                                        {(item) => (
                                            <option value={`${item._id}`}>
                                                {(item as any).goal || `Sprint`}
                                            </option>
                                        )}
                                    </For>
                                </>
                            }
                        ></Select>
                    </div>
                </div>
            </div>

            <BaseLine class="h-1 w-[98%]" />

            {/* Filters */}
            <div class="flex items-center gap-6 pt-4 pl-40 font-medium text-slate-600">
                <span class="animate-slide-up text-3xl font-bold text-slate-500 opacity-0">
                    Filters:
                </span>

                <div
                    class="animate-slide-up opacity-0"
                    style={{ 'animation-delay': '100ms' }}
                >
                    <Select
                        name="Status"
                        value={statusFilter()}
                        onInput={(e) =>
                            setStatusFilter(e.currentTarget.value as any)
                        }
                        content={
                            <>
                                <option value="ANY">Select Status</option>
                                <option value="To Do">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{ 'animation-delay': '200ms' }}
                >
                    <Select
                        name="Priority"
                        value={priorityFilter()}
                        onInput={(e) =>
                            setPriorityFilter(e.currentTarget.value as any)
                        }
                        content={
                            <>
                                <option value="ANY">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{ 'animation-delay': '300ms' }}
                >
                    <Select
                        name="Risk"
                        value={riskFilter()}
                        onInput={(e) =>
                            setRiskFilter(e.currentTarget.value as any)
                        }
                        content={
                            <>
                                <option value="ANY">Select Risk</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{ 'animation-delay': '400ms' }}
                >
                    <Select
                        name="Team"
                        value={teamFilter()}
                        onInput={(e) =>
                            setTeamFilter(e.currentTarget.value as any)
                        }
                        content={
                            <>
                                <option value="ANY">Select Team</option>
                                <option value="TEAM_1">Team 1</option>
                            </>
                        }
                    />
                </div>

                <div
                    class="animate-slide-up opacity-0"
                    style={{ 'animation-delay': '500ms' }}
                >
                    <button
                        onClick={resetFilters}
                        class="rounded-lg bg-slate-200 p-2 text-lg shadow-sm hover:-translate-y-0.5 hover:cursor-pointer hover:bg-slate-300 hover:shadow-md active:scale-95"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Backlog Grid */}
            <div class="w-full p-40 pt-10 pb-10">
                <div class="grid grid-cols-4 gap-8">
                    <Show
                        when={globalActiveSprintId()}
                        fallback={
                            <p class="col-span-4 text-center text-lg text-slate-500">
                                Please select a sprint from the dropdown above.
                            </p>
                        }
                    >
                        <Show
                            when={!getSprintData.loading}
                            fallback={
                                <p class="col-span-4 text-center text-lg">
                                    Loading sprint data...
                                </p>
                            }
                        >
                            <Show
                                when={sprintBacklogEntries().length > 0}
                                fallback={
                                    <p class="col-span-4 text-center text-lg">
                                        No items match your filters.
                                    </p>
                                }
                            >
                                <For each={sprintBacklogEntries()}>
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
                            </Show>
                        </Show>
                    </Show>
                </div>
            </div>

            <div
                class="animate-slide-up pl-40 opacity-0"
                style={{ 'animation-delay': '1000ms' }}
            >
                <button
                    onclick={() => states.setModal('ADD_TO_SPRINT')}
                    class="z-100 rounded-lg border-2 border-gray-300 bg-blue-500 p-4 text-center font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer hover:shadow-xl active:scale-95 active:duration-50"
                >
                    + Add to Sprint
                </button>
            </div>
        </div>
    )
}

export default SprintBacklog
