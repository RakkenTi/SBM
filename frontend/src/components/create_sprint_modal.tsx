import { createSignal, Setter } from 'solid-js'
import InputBox from './inputbox'
import SubHeader from './subheader'
import states from '../globals/states'
import { getProductName } from '../pages/Manage' // We will export this from Management.tsx next

const [goal, setGoal] = createSignal<string>('')
const [startDate, setStartDate] = createSignal<string>('')
const [endDate, setEndDate] = createSignal<string>('')
const [cost, setCost] = createSignal<number>(0)

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

        <InputBox
            type="text"
            label="Sprint Goal:"
            placeholder="Implement user authentication"
            value={goal()}
            onInput={(e) => handleInput(e, setGoal)}
        />

        <InputBox
            type="date"
            label="Start Date:"
            placeholder=""
            value={startDate()}
            onInput={(e) => handleInput(e, setStartDate)}
        />

        <InputBox
            type="date"
            label="End Date:"
            placeholder=""
            value={endDate()}
            onInput={(e) => handleInput(e, setEndDate)}
        />

        <InputBox
            type="number"
            label="Budget / Cost:"
            placeholder="5000"
            value={cost()}
            onInput={(e) => handleInput(e, setCost)}
        />

        <button
            onClick={async () => {
                const data = {
                    goal: goal(),
                    startDate: startDate(),
                    endDate: endDate(),
                    cost: cost(),
                    productName: getProductName(), // Links this sprint to the current product
                }

                try {
                    states.setModal('NONE')

                    // Assuming you will create this route next!
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
                            result.message || 'Something went wrong',
                        )
                    }

                    console.log('Success:', result.message)

                    // TODO: Trigger a refetch of the Management page data here!
                } catch (error: any) {
                    console.error('Error creating sprint:', error.message)
                }
            }}
            class="mt-4 rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95"
        >
            Create Sprint
        </button>
    </div>
)

export default CreateSprintModal
