import { createSignal, For, Show } from 'solid-js'
import SubHeader from './subheader'
import Select from './select'
import states from '../globals/states'

// --- Import the sprint refetch from the global store! ---
import {
    globalProductData,
    globalActiveSprintId,
    globalRefetch,
    globalSprintRefetch, // <-- ADDED THIS
} from '../globals/store'

const AddToSprintModal = () => {
    const [selectedItemId, setSelectedItemId] = createSignal<string>('')

    return (
        <div class="flex w-96 flex-col gap-6 rounded-xl bg-gray-200 p-8 text-center transition-all duration-300">
            <SubHeader label="Add to Sprint"></SubHeader>

            <p class="text-left text-sm text-slate-600">
                Select an item from the Product Backlog to pull into the current
                Sprint.
            </p>

            <div class="text-left">
                <Select
                    name="Select Item"
                    value={selectedItemId()}
                    onInput={(e) => setSelectedItemId(e.currentTarget.value)}
                    content={
                        <>
                            <option value="">
                                -- Choose a Backlog Item --
                            </option>
                            {/* Read directly from the Global Store reactively */}
                            <For each={globalProductData()?.PBLItems || []}>
                                {(item: any) => (
                                    <option value={item._id}>
                                        {item.title ||
                                            item.name ||
                                            'Untitled Item'}
                                    </option>
                                )}
                            </For>
                        </>
                    }
                />
            </div>

            {/* Read the active sprint directly from the Global Store */}
            <Show when={!globalActiveSprintId()} fallback={null}>
                <p class="text-sm font-bold text-red-500">
                    Warning: Please select a Sprint on the background page
                    first!
                </p>
            </Show>

            <button
                disabled={!selectedItemId() || !globalActiveSprintId()}
                onClick={async (e) => {
                    e.preventDefault()
                    const sprintID = globalActiveSprintId()
                    if (!sprintID || !selectedItemId()) return

                    try {
                        states.setModal('NONE')

                        const response = await fetch(
                            '/api/add_item_to_sprint',
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    sprintID: sprintID,
                                    itemID: selectedItemId(),
                                }),
                            },
                        )

                        if (!response.ok) {
                            const result = await response.json()
                            throw new Error(
                                result.message || 'Failed to add item',
                            )
                        }

                        // --- Trigger BOTH UI grids to instantly update! ---
                        const pblRefetch = globalRefetch()
                        if (pblRefetch) pblRefetch()

                        const sblRefetch = globalSprintRefetch()
                        if (sblRefetch) sblRefetch()
                    } catch (error: any) {
                        console.error(
                            'Error adding item to sprint:',
                            error.message,
                        )
                    }
                }}
                class="mt-2 rounded-md bg-blue-500 p-3 font-semibold text-white hover:scale-105 hover:cursor-pointer hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Confirm Add
            </button>
        </div>
    )
}

export default AddToSprintModal
