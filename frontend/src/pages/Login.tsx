import InputBox from '../components/inputbox'
import {
    MAX_ID_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_ID_LENGTH,
    MIN_PASSWORD_LENGTH,
    PASSSWORD_REGEX,
    USER_ID_REGEX,
} from '../../../shared/shared_config'
import { JSX } from 'solid-js/h/jsx-runtime'
import { CLIENT_URL } from '../globals/client_config'
import {
    clientData,
    ProductDescriptor,
    setClientData,
} from '../globals/client_data'

export const updateProductList = async () => {
    // Fill in products
    try {
        const response = await fetch(CLIENT_URL + '/api/all_products')

        if (response.ok) {
            const data = await response.json()
            const products = data.products
            const currentAssignedProducts = []
            console.log('Data:', data)
            for (let product of products) {
                const assignedUsers: Array<String> = product.productUsers || []
                if (assignedUsers.includes(clientData.userID)) {
                    const productData: ProductDescriptor = {
                        name: product.productName,
                        description: product.productDescription,
                    }
                    currentAssignedProducts.push(productData)
                }
            }
            setClientData('assignedProducts', currentAssignedProducts)
        } else {
            console.log('Response not OK.')
            return
        }
    } catch (error) {
        console.log('Failed to fetch all products:', error)
        return
    }
}

const handleLogin: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    event,
) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const registerData = {
        userID: formData.get('UserID'),
        password: formData.get('Password'),
    }

    try {
        const response = await fetch(CLIENT_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(registerData),
        })

        const result = await response.json()

        if (response.ok) {
            const firstName = result.firstName
            const lastName = result.lastName
            const userID = result.userID
            setClientData('loggedIn', true)
            setClientData('firstName', firstName)
            setClientData('lastName', lastName)
            setClientData('userID', userID)
        } else {
            console.log('Failed to login:', result.message)
            alert(result.message)
        }
    } catch (error) {
        console.log('Error:', error)
    }

    await updateProductList()
}

const LoginPage = () => {
    return (
        <div class="z-0 flex min-h-screen items-center justify-center bg-slate-300 transition-all duration-300">
            <form
                onSubmit={handleLogin}
                class="flex flex-col gap-4 rounded-md bg-slate-200 p-4 font-semibold"
            >
                <h1 class="text-center text-xl">Login</h1>
                <InputBox
                    name="UserID"
                    type="text"
                    label="ID"
                    placeholder=""
                    maxLength={MAX_ID_LENGTH}
                    minLength={MIN_ID_LENGTH}
                    pattern={USER_ID_REGEX}
                />
                <InputBox
                    name="Password"
                    type="password"
                    label="Password"
                    placeholder=""
                    maxLength={MAX_PASSWORD_LENGTH}
                    minLength={MIN_PASSWORD_LENGTH}
                    pattern={PASSSWORD_REGEX}
                />
                <button class="rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95">
                    Login
                </button>
                <a href="/register" class="flex justify-center">
                    <span class="rounded-sm bg-blue-200 p-2 pr-4 pl-4 text-center text-sm font-normal tracking-tight text-slate-700 hover:scale-105 hover:cursor-pointer active:scale-95">
                        New User? Click here to register.
                    </span>
                </a>
            </form>
        </div>
    )
}

export default LoginPage
