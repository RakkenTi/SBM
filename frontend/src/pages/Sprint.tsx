import { Component, createSignal, For, Setter } from 'solid-js'
import BaseLine from '../components/base_line'
import Select from '../components/select'
import ProductBacklogCard, {
    ProductBacklogCardProps,
} from '../components/backlog_item_card'
import CreateBacklogEntryModal from '../components/create_backlog_entry_modal'
import ModalContainer from '../components/modal_container'
import { ProductPageSubpage } from '../globals/client_data'
import GenericButton from '../components/generic_button'

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

const [modalState, setModalState] = createSignal<'NONE' | 'CBE' | 'CS'>('NONE')

const productBacklogEntries: Array<ProductBacklogCardProps> = []

for (let i = 0; i < 10; i++) {
    productBacklogEntries.push({
        name: 'Example Task',
        description: 'Example task description',
        priority: 'HIGH',
        status: 'In Progress',
        effort: 0,
        assignee: 'Bobby',
    })
}

const SprintBacklog: Component<ProductPageSubpage> = () => (
    <div class="z-0 flex min-h-screen flex-col">
        <ModalContainer
            state={modalState}
            stateSetter={setModalState}
            modals={[
                {
                    state_name: 'CBE',
                    content: <CreateBacklogEntryModal />,
                },
            ]}
        />

        <div class="pt-10"></div>
        <div class="flex items-center justify-center">
            <div class="w-[98%] font-semibold">
                <div class="float-left flex flex-row items-center justify-center gap-4 text-xl">
                    <GenericButton
                        onClick={() => {
                            setModalState('CS')
                        }}
                    >
                        + Create Sprint
                    </GenericButton>
                </div>
                <div class="float-right flex flex-row items-center justify-center gap-4 text-xl">
                    <h1>View Sprint:</h1>
                    <Select
                        name="Sprint"
                        value="Sprint 1"
                        content={
                            <>
                                <option value="Sprint 1">Sprint 1</option>
                                <option value="Sprint 2">Sprint 2</option>
                            </>
                        }
                    ></Select>
                </div>
            </div>
        </div>
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
                <For each={productBacklogEntries}>
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
                    setModalState('CBE')
                }}
                class="z-100 rounded-lg border-2 border-gray-300 bg-blue-500 p-4 text-center font-semibold tracking-tight text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer hover:shadow-xl active:scale-95 active:duration-50"
            >
                + Add Backlog Item
            </button>
        </div>
    </div>
)

export default SprintBacklog
