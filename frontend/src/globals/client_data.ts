import { createStore } from 'solid-js/store'

export interface ProductDescriptor {
    name: string
    description: string
}

interface ClientGlobals {
    userName: string
    firstName: string
    userID: string
    lastName: string
    loggedIn: boolean
    assignedProducts: Array<ProductDescriptor>
}

export const [clientData, setClientData] = createStore<ClientGlobals>({
    userName: '',
    userID: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
    assignedProducts: [],
})
