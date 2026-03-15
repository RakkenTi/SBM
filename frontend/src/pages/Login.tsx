import InputBox from "../components/inputbox"

const LoginPage = () => 
    (
    <div class="z-0 flex min-h-screen justify-center items-center bg-slate-300">
        <div class="p-4 bg-slate-200 rounded-md font-semibold flex flex-col gap-4">
            <h1 class="text-xl text-center">Login</h1>
            <InputBox type="text" label="ID" placeholder=""/>
            <InputBox type="text" label="Password" placeholder=""/>
            <button class="bg-slate-300 rounded-md p-2 hover:scale-105 hover:cursor-pointer active:scale-95">Login</button>
        </div>
    </div>
    )

export default LoginPage