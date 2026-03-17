import { createStore } from 'solid-js/store'

interface ClientGlobals {
    firstName: string
    lastName: string
    loggedIn: boolean
    assignedProducts: Map<string, Map<any, any>>
}

export const [clientData, setClientData] = createStore<ClientGlobals>({
    firstName: '',
    lastName: '',
    loggedIn: false,
    assignedProducts: new Map(),
})
