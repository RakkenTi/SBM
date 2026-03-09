import { createSignal } from 'solid-js'
import BaseLine from '../components/base_line'
import Select from '../components/select'
import SubHeader from '../components/subheader'

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

const ProductBacklog = () => (
    <div class="min-h-screen flex flex-col z-0">
        <div class="pt-10"></div>
        <BaseLine class="h-1 w-[90%]" />
        <div class="flex p-15 gap-6 pt-4 font-medium text-slate-600 items-center">
            <span class="text-3xl font-bold text-slate-500">Filters:</span>
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
            <button class="bg-slate-200 hover:bg-slate-300 rounded-lg p-2 text-lg shadow-sm hover:shadow-md active:-y-translate-0.5 active:scale-95 hover:cursor-pointer">
                Reset Filters
            </button>
        </div>
    </div>
)

export default ProductBacklog
