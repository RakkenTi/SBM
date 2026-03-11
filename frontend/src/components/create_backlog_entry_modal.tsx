import SubHeader from './subheader'
import Textbox from './textbox'

const CreateBacklogEntryModal = () => (
    <div class="flex flex-col gap-4 rounded-xl bg-gray-200 p-8 text-center">
        <SubHeader label="Create Entry"></SubHeader>
        <Textbox label="Name:" placeholder="Implement Stripe" />
        <Textbox
            label="Description:"
            placeholder="Implement Stripe payment gateway."
        />
    </div>
)

export default CreateBacklogEntryModal
