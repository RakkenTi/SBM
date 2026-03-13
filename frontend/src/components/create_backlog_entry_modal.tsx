import InputBox from './inputbox'
import OptionBox from './optionbox'
import SubHeader from './subheader'

const CreateBacklogEntryModal = () => (
    <div class="flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center">
        <SubHeader label="Create Entry"></SubHeader>
        <InputBox type="text" label="Name:" placeholder="Implement Stripe" />
        <InputBox
            type="text"
            label="Description:"
            placeholder="Stripe payment gateway."
        />
        <InputBox type="number" label="Effort:" placeholder="4" />
        <OptionBox label="DD" placeholder="boo" type="button" />
    </div>
)

export default CreateBacklogEntryModal
