interface ClientGlobals {
    firstName: string
    lastName: string
    loggedIn: boolean
    assignedProducts: Map<string, Map<any, any>>
}

export const ClientGlobals: ClientGlobals = {
    firstName: '',
    lastName: '',
    loggedIn: false,
    assignedProducts: new Map(),
}
