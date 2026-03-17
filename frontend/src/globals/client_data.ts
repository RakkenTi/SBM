import { createStore } from 'solid-js/store'

interface ClientGlobals {
    userID: string
    firstName: string
    lastName: string
    loggedIn: boolean
    assignedProducts: Map<string, Map<any, any>>
}

export const [clientData, setClientData] = createStore<ClientGlobals>({
    userID: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
    assignedProducts: new Map(),
})
