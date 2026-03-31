import ModalContainer from './modal_container'
import states, { MODAL_NAMES } from '../globals/states'
import ConfirmModal from './confirm_modal'
import LoadingModal from './loading_modal'
import CreateBacklogEntryModal from './create_backlog_entry_modal'
import CreateSprintModal from './create_sprint'
import { AcceptCreateProduct, RejectCreateProduct } from '../pages/Portal'
import AddToSprintModal from './add_to_sprint_modal'

export const Modals = () => (
    <ModalContainer<MODAL_NAMES>
        state={states.modal}
        stateSetter={states.setModal}
        modals={[
            {
                state_name: 'CONFIRM',
                content: (
                    <ConfirmModal
                        title="Create Product"
                        acceptCallback={AcceptCreateProduct}
                        rejectCallback={RejectCreateProduct}
                    />
                ),
            },
            {
                state_name: 'LOADING',
                content: <LoadingModal label="Creating Product" />,
            },
            {
                state_name: 'CREATE_BACKLOG_ENTRY',
                content: <CreateBacklogEntryModal />,
            },
            {
                state_name: 'CREATE_SPRINT',
                content: <CreateSprintModal />,
            },
            {
                state_name: 'ADD_TO_SPRINT',
                content: <AddToSprintModal />,
            },
        ]}
    />
)
