import { JSX } from 'solid-js/h/jsx-runtime'
import {
    MAX_ID_LENGTH,
    MAX_NAME_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_ID_LENGTH,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    NAME_REGEX,
    PASSSWORD_REGEX,
    USER_ID_REGEX,
} from '../../../shared/shared_config'
import InputBox from '../components/inputbox'

const handleRegister: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    event,
) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const registerData = {
        firstName: formData.get('FirstName'),
        lastName: formData.get('LastName'),
        userName: formData.get('UserName'),
        password: formData.get('Password'),
    }

    try {
        const response = await fetch('/api/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        })

        const result = await response.json()

        if (response.ok) {
            console.log('User sucessfully created:', result.message)
            window.location.href = '/login'
        } else {
            console.log('Failed to register user:', result.message)
            alert(result.message)
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

const RegisterPage = () => (
    <div class="z-0 flex min-h-screen items-center justify-center bg-slate-300 transition-all">
        <form
            onsubmit={handleRegister}
            class="flex flex-col gap-4 rounded-md bg-slate-200 p-4 font-semibold"
        >
            <h1 class="text-center text-xl">Register</h1>
            <InputBox
                required
                name="FirstName"
                type="text"
                label="First Name"
                placeholder="John"
                maxLength={MAX_NAME_LENGTH}
                minLength={MIN_NAME_LENGTH}
                pattern={NAME_REGEX}
            />
            <InputBox
                required
                name="LastName"
                type="text"
                label="Last Name"
                placeholder="Doe"
                maxLength={MAX_NAME_LENGTH}
                minLength={MIN_NAME_LENGTH}
                pattern={NAME_REGEX}
            />
            <InputBox
                required
                name="UserName"
                type="text"
                label="ID"
                placeholder="JD2006"
                maxLength={MAX_ID_LENGTH}
                minLength={MIN_ID_LENGTH}
                pattern={USER_ID_REGEX}
            />
            <InputBox
                required
                name="Password"
                type="password"
                label="Password"
                placeholder="*********"
                maxLength={MAX_PASSWORD_LENGTH}
                minLength={MIN_PASSWORD_LENGTH}
                pattern={PASSSWORD_REGEX}
            />
            <button
                type="submit"
                class="rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95"
            >
                Register
            </button>
            <a href="/login" class="flex justify-center">
                <span class="rounded-sm bg-blue-200 p-2 pr-4 pl-4 text-center text-sm font-normal tracking-tight text-slate-700 hover:scale-105 hover:cursor-pointer active:scale-95">
                    Existing User? Click here to login.
                </span>
            </a>
        </form>
    </div>
)

export default RegisterPage
