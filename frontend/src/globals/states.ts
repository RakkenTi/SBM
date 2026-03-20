import { createSignal } from 'solid-js'

export type MODAL_NAMES =
    | 'NONE'
    | 'CONFIRM'
    | 'LOADING'
    | 'CREATE_BACKLOG_ENTRY'
    | 'CREATE_SPRINT'

const [modal, setModal] = createSignal<MODAL_NAMES>('NONE')
export default {
    modal,
    setModal,
}
