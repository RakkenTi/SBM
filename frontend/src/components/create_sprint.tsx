import InputBox from './inputbox'
import OptionBox from './optionbox'
import SlideUpContainer from './slideup_container'
import SubHeader from './subheader'

const CreateSprintModal = () => (
    <div class="flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center transition-all duration-300">
        <SubHeader label="Create Sprint"></SubHeader>
        <InputBox type="text" label="Name:" placeholder="e.g. Initial Sprint" />
        <InputBox
            type="text"
            label="Goal:"
            placeholder="e.g. Complete the hero page!"
        />
        <div class="flex gap-2">
            <InputBox type="date" label="Start" />
            <InputBox type="date" label="End" />
        </div>
        <InputBox type="number" label="Total Budget" placeholder="40" />
        <div class="flex gap-2">
            <OptionBox
                label="Team"
                placeholder="Team"
                type="button"
                options={['Team 1', 'Team 2', 'Team 3']}
            />
        </div>
        <SlideUpContainer>
            <button class="w-full rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95">
                Create
            </button>
        </SlideUpContainer>
    </div>
)

export default CreateSprintModal
