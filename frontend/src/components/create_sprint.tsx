import { createSignal, Setter } from 'solid-js'
import InputBox from './inputbox'
import OptionBox from './optionbox'
import SlideUpContainer from './slideup_container'
import SubHeader from './subheader'
import states from '../globals/states'
import { getProductId } from '../pages/Manage' // Ensure this matches your Management page path

// 1. Create signals to hold the form data
const [name, setName] = createSignal<string>('') // Note: Your schema doesn't have a 'name' field, but I kept the UI for you!
const [goal, setGoal] = createSignal<string>('')
const [startDate, setStartDate] = createSignal<string>('')
const [endDate, setEndDate] = createSignal<string>('')
const [cost, setCost] = createSignal<number>(0)
const [team, setTeam] = createSignal<string>('')

// Helper to handle input changes
const handleInput = (
    e: InputEvent & {
        currentTarget: HTMLInputElement
        target: HTMLInputElement
    },
    setter: Setter<any>,
) => {
    setter(e.currentTarget.value)
}

const CreateSprintModal = () => (
    <div class="flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center transition-all duration-300">
        <SubHeader label="Create Sprint"></SubHeader>

        {/* 2. Bind signals to your input boxes */}
        <InputBox
            type="text"
            label="Name:"
            placeholder="e.g. Initial Sprint"
            value={name()}
            onInput={(e) => handleInput(e, setName)}
        />

        <InputBox
            type="text"
            label="Goal:"
            placeholder="e.g. Complete the hero page!"
            value={goal()}
            onInput={(e) => handleInput(e, setGoal)}
        />

        <div class="flex gap-2">
            <InputBox
                type="date"
                label="Start"
                value={startDate()}
                onInput={(e) => handleInput(e, setStartDate)}
            />
            <InputBox
                type="date"
                label="End"
                value={endDate()}
                onInput={(e) => handleInput(e, setEndDate)}
            />
        </div>

        <InputBox
            type="number"
            label="Total Budget"
            placeholder="40"
            value={cost()}
            onInput={(e) => handleInput(e, setCost)}
        />

        <div class="flex gap-2">
            <OptionBox
                label="Team"
                placeholder="Team"
                type="button"
                options={['Team 1', 'Team 2', 'Team 3']}
                value={team()}
                onInput={(e) => handleInput(e, setTeam)}
            />
        </div>

        <SlideUpContainer>
            <button
                onClick={async () => {
                    const data = {
                        sprintData: {
                            name: name(),
                            goal: goal(),
                            startDate: startDate(),
                            endDate: endDate(),
                            cost: cost(),
                            productID: getProductId(),
                        },
                    }

                    try {
                        // Close modal immediately for snappy UI
                        states.setModal('NONE')

                        const response = await fetch('/api/create_sprint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })

                        const result = await response.json()

                        if (!response.ok) {
                            throw new Error(
                                result.message || 'Failed to create sprint',
                            )
                        }

                        console.log(
                            'Sprint successfully created:',
                            result.sprint,
                        )

                        // TODO: Add a refetch trigger here so the Management page updates instantly!
                    } catch (error: any) {
                        console.error('Error creating sprint:', error.message)
                        // Optional: Re-open modal or show toast if it fails
                    }
                }}
                class="w-full rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95"
            >
                Create
            </button>
        </SlideUpContainer>
    </div>
)

export default CreateSprintModal
