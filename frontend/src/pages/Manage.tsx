import { Component, createMemo, createSignal, For, Show } from 'solid-js'
import Line from '../components/line'
import SubHeader from '../components/subheader'
import { ProductPageSubpage } from '../globals/client_data'
import { ProductSchemaType } from '@shared/types'
import GenericButton from '../components/generic_button'
import states from '../globals/states'
import BaseLine from '../components/base_line'

const [productData, setProductData] = createSignal<ProductSchemaType>()
let lastProductName = ''
let lastProductId = ''

export const getProductName = () => lastProductName
export const getProductId = () => lastProductId

const Management: Component<ProductPageSubpage> = (props) => {
    setProductData(props.data)
    lastProductName = props.data?.productName || ''
    lastProductId = props.data?._id || ''

    const userLevelsMemo = createMemo(() => {
        const data = productData()?.userLevels
        return data ? Object.entries(data) : []
    })

    return (
        <div class="z-0 flex min-h-screen flex-col items-start px-20 pb-20">
            <div class="pt-10"></div>

            <SubHeader label={`Management Hub`} class="text-5xl" />

            <BaseLine class="mt-4 h-1 w-full" />

            {/* --- SPRINT MANAGEMENT SECTION --- */}
            <div class="w-full pt-10">
                <div class="mb-6 flex items-center justify-between">
                    <SubHeader
                        label="Sprint Management"
                        class="text-3xl text-slate-700"
                    />
                    <GenericButton
                        onClick={() => states.setModal('CREATE_SPRINT')}
                    >
                        + Create Sprint
                    </GenericButton>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                    <h3 class="mb-4 text-xl font-semibold text-slate-700">
                        Existing Sprints
                    </h3>

                    <div class="flex flex-col gap-3">
                        <Show
                            when={
                                productData()?.Sprints &&
                                (productData()?.Sprints.length || 0) > 0
                            }
                            fallback={
                                <p class="text-gray-500 italic">
                                    No sprints created yet. Click above to make
                                    one.
                                </p>
                            }
                        >
                            <For each={productData()?.Sprints}>
                                {(sprint: any, index) => {
                                    console.log('Sprint:', sprint)
                                    return (
                                        <div class="flex items-center justify-between rounded-md border border-gray-300 bg-white p-4 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
                                            <div class="flex w-1/3 flex-col">
                                                <span class="text-lg font-bold text-slate-800">
                                                    Sprint {index() + 1}
                                                </span>
                                                <span class="truncate text-sm text-slate-500">
                                                    {sprint.goal ||
                                                        'No goal set'}
                                                </span>
                                            </div>

                                            <div class="flex w-1/2 justify-between text-sm text-slate-600">
                                                <div class="flex flex-col">
                                                    <span class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                        Start Date
                                                    </span>
                                                    <span>
                                                        {new Date(
                                                            sprint.startDate,
                                                        ).toLocaleDateString() ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <span class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                        End Date
                                                    </span>
                                                    <span>
                                                        {new Date(
                                                            sprint.endDate,
                                                        ).toLocaleDateString() ||
                                                            'N/A'}
                                                    </span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <span class="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                        Status
                                                    </span>
                                                    <span
                                                        class={`font-bold ${sprint.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}
                                                    >
                                                        {sprint.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="flex w-1/6 justify-end">
                                                <button class="text-sm font-semibold text-blue-500 underline underline-offset-2 hover:text-blue-700">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }}
                            </For>
                        </Show>
                    </div>
                </div>
            </div>

            <Line class="my-10 w-full bg-slate-200" />

            {/* --- TEAM MANAGEMENT SECTION --- */}
            <div class="w-full">
                <div class="mb-6 flex items-center justify-between">
                    <SubHeader
                        label="Team Roster"
                        class="text-3xl text-slate-700"
                    />
                    <GenericButton
                        onClick={() => console.log('Add team member modal')}
                    >
                        + Add Member
                    </GenericButton>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                    <Show
                        when={userLevelsMemo().length > 0}
                        fallback={
                            <p class="text-gray-500 italic">
                                No team members assigned.
                            </p>
                        }
                    >
                        <div class="flex flex-col gap-2">
                            {/* Table Header */}
                            <div class="flex px-4 py-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                <div class="w-1/2">Username</div>
                                <div class="w-1/4">Role</div>
                                <div class="w-1/4 text-right">Actions</div>
                            </div>

                            {/* Table Rows */}
                            <For each={userLevelsMemo()}>
                                {([userName, role], i) => (
                                    <div class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm transition-colors hover:bg-slate-50">
                                        <div class="w-1/2 font-medium text-slate-800">
                                            {userName}
                                        </div>
                                        <div class="w-1/4">
                                            <span
                                                class={`rounded-full px-3 py-1 text-xs font-bold ${role === 'Product Owner' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                                            >
                                                {role as string}
                                            </span>
                                        </div>
                                        <div class="flex w-1/4 justify-end gap-3 text-sm">
                                            <button class="font-medium text-blue-500 hover:text-blue-700">
                                                Edit Role
                                            </button>
                                            <span class="text-gray-300">|</span>
                                            <button class="font-medium text-red-500 hover:text-red-700">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </For>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    )
}

export default Management
