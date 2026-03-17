import { createStore } from 'solid-js/store'

export interface ProductDescriptor {
    name: string
    description: string
}

interface ClientGlobals {
    userID: string
    firstName: string
    lastName: string
    loggedIn: boolean
    assignedProducts: Array<ProductDescriptor>
}

export const [clientData, setClientData] = createStore<ClientGlobals>({
    userID: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
    assignedProducts: [],
})
