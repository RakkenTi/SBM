import InputBox from '../components/inputbox'

const RegisterPage = () => (
    <div class="z-0 flex min-h-screen items-center justify-center bg-slate-300 transition-all">
        <div class="flex flex-col gap-4 rounded-md bg-slate-200 p-4 font-semibold">
            <h1 class="text-center text-xl">Register</h1>
            <InputBox type="text" label="First Name" placeholder="John" />
            <InputBox type="text" label="Last Name" placeholder="Doe" />
            <InputBox type="text" label="ID" placeholder="JD2006" />
            <InputBox
                type="password"
                label="Password"
                placeholder="*********"
            />
            <button class="rounded-md bg-slate-300 p-2 hover:scale-105 hover:cursor-pointer active:scale-95">
                Login
            </button>
            <a href="/login" class="flex justify-center">
                <span class="rounded-sm bg-blue-200 p-2 pr-4 pl-4 text-center text-sm font-normal tracking-tight text-slate-700 hover:scale-105 hover:cursor-pointer active:scale-95">
                    Existing User? Click here to login.
                </span>
            </a>
        </div>
    </div>
)

export default RegisterPage
