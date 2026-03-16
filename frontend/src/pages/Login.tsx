import InputBox from '../components/inputbox'
import {
    MAX_PASSWORD_LENGTH,
    MAX_USERNAME_LENGTH,
} from '../../../shared/shared_config'

const LoginPage = () => (
    <div class="z-0 flex min-h-screen items-center justify-center bg-slate-300 transition-all duration-300">
        <div class="flex flex-col gap-4 rounded-md bg-slate-200 p-4 font-semibold">
            <h1 class="text-center text-xl">Login</h1>
            <InputBox
                type="text"
                label="ID"
                placeholder=""
                maxLength={MAX_USERNAME_LENGTH}
            />
            <InputBox
                type="password"
                label="Password"
                placeholder=""
                maxLength={MAX_PASSWORD_LENGTH}
            />
            <button class="rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95">
                Login
            </button>
            <a href="/register" class="flex justify-center">
                <span class="rounded-sm bg-blue-200 p-2 pr-4 pl-4 text-center text-sm font-normal tracking-tight text-slate-700 hover:scale-105 hover:cursor-pointer active:scale-95">
                    New User? Click here to register.
                </span>
            </a>
        </div>
    </div>
)

export default LoginPage
