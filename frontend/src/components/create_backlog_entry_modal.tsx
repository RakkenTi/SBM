import { createSignal, Setter } from 'solid-js'
import InputBox from './inputbox'
import OptionBox from './optionbox'
import SubHeader from './subheader'
import { getProductName, refetchPBL } from '../pages/ProductBacklog'
import states from '../globals/states'

const [name, setName] = createSignal<string>('')
const [description, setDescription] = createSignal<string>('')
const [effort, setEffort] = createSignal<number>(0)
const [risk, setRisk] = createSignal<'High' | 'Medium' | 'Low'>('Low')
const [priority, setPriority] = createSignal<'High' | 'Medium' | 'Low'>('Low')
const [status, setStatus] = createSignal<'To Do' | 'In Progress' | 'Done'>(
    'To Do',
)
const [team, setTeam] = createSignal<string>('')

const handleInput = (
    e: InputEvent & {
        currentTarget: HTMLInputElement
        target: HTMLInputElement
    },
    setter: Setter<any>,
) => {
    setter(e.currentTarget.value)
}

const CreateBacklogEntryModal = () => (
    <div class="flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center transition-all duration-300">
        <SubHeader label="Create Entry"></SubHeader>
        <InputBox
            type="text"
            label="Name:"
            placeholder="Implement Stripe"
            value={name()}
            onInput={(e) => handleInput(e, setName)}
        />
        <InputBox
            type="text"
            label="Description:"
            placeholder="Stripe payment gateway."
            value={description()}
            onInput={(e) => handleInput(e, setDescription)}
        />
        <InputBox
            type="number"
            label="Effort:"
            placeholder="4"
            value={effort()}
            onInput={(e) => handleInput(e, setEffort)}
        />
        <OptionBox
            label="Priority"
            placeholder="Priority"
            type="button"
            options={['High', 'Medium', 'Low']}
            value={priority()}
            onInput={(e) => handleInput(e, setPriority)}
        />
        <OptionBox
            label="Risk"
            placeholder="Risk"
            type="button"
            options={['High', 'Medium', 'Low']}
            value={risk()}
            onInput={(e) => handleInput(e, setRisk)}
        />
        <OptionBox
            label="Status"
            placeholder="Status"
            type="button"
            options={['To Do', 'In Progress', 'Done']}
            value={status()}
            onInput={(e) => handleInput(e, setStatus)}
        />
        <OptionBox
            label="Team"
            placeholder="Team"
            type="button"
            options={['Team 1', 'Team 2', 'Team 3']}
            value={team()}
            onInput={(e) => handleInput(e, setTeam)}
        />
        <button
            onClick={async () => {
                const data = {
                    title: name(),
                    description: description(),
                    effort: effort(),
                    priority: priority(),
                    risk: risk(),
                    status: status(),
                    teamLabel: team(),
                    productName: getProductName(),
                }

                try {
                    states.setModal('NONE')

                    const response = await fetch('/api/create_item', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })

                    const result = await response.json()

                    if (!response.ok) {
                        throw new Error(
                            result.message || 'Something went wrong',
                        )
                    }

                    console.log('Success:', result.message)
                    console.log('Created Item:', result.item)

                    return result.item
                } catch (error: any) {
                    console.error('Error creating item:', error.message)
                } finally {
                    if (refetchPBL) {
                        refetchPBL()
                    } else {
                        console.error('No refetch')
                    }
                }
            }}
            class="rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95"
        >
            Create
        </button>
    </div>
)

export default CreateBacklogEntryModal
