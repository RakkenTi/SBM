import InputBox from './inputbox'
import OptionBox from './optionbox'
import SubHeader from './subheader'

const CreateBacklogEntryModal = () => (
    <div class="transition-all duration-300 flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center">
        <SubHeader label="Create Entry"></SubHeader>
        <InputBox type="text" label="Name:" placeholder="Implement Stripe" />
        <InputBox
            type="text"
            label="Description:"
            placeholder="Stripe payment gateway."
        />
        <InputBox type="number" label="Effort:" placeholder="4" />
        <OptionBox label="Priority" placeholder="Priority" type="button" options={[
            "High",
            "Medium",
            "Low"
        ]} />
        <OptionBox label="Risk" placeholder="Risk" type="button" options={[
            "High",
            "Medium",
            "Low"
        ]} />
        <OptionBox label="Status" placeholder="Status" type="button" options={[
            "To Do",
            "In Progress",
            "Done"
        ]} />
        <OptionBox label="Team" placeholder="Team" type="button" options={[
            "Team 1",
            "Team 2",
            "Team 3"
        ]} />
        <button class="bg-slate-300 rounded-md p-2 hover:scale-105 hover:cursor-pointer active:scale-95">Create</button>
    </div>
)

export default CreateBacklogEntryModal
