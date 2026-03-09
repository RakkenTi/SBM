import { createSignal, createMemo, For, Show } from 'solid-js'
import ProfilePicture from '../components/profile_picture'
import NavButton from '../components/nav_button'
import Dashboard from './Dashboard'
import ProductBacklog from './ProductBacklog'

const navbar_buttons = [
    { name: 'Dashboard', icon: '' },
    { name: 'Product Backlog', icon: '' },
    { name: 'Sprint Backlog', icon: '' },
]

const [tab, setTab] = createSignal(navbar_buttons[0].name)

function Product() {
    return (
        <div class="min-h-screen bg-slate-100 flex flex-col">
            <header class="z-10 sticky w-full inset-x-0 top-0 bg-cyan-500 shadow-xl flex flex-col">
                <div class="flex w-full justify-center md:justify-between p-8 pl-12 pr-12">
                    <h1 class="text-4xl text-white font-bold tracking-tight">
                        Product Name
                    </h1>
                    <div class="hidden md:block">
                        <ProfilePicture />
                    </div>
                </div>
                <nav class="w-full bg-cyan-200 p-6 md:p-8 shadow-xl gap-4 text-center md:gap-16 flex justify-center">
                    <For each={navbar_buttons}>
                        {(item) => (
                            <NavButton
                                label={item.name}
                                icon={item.icon}
                                selected={() => tab()}
                                callback={() => {
                                    console.log(item.name)
                                    setTab(item.name)
                                }}
                            />
                        )}
                    </For>
                </nav>
            </header>

            <Show when={tab() === 'Dashboard'}>
                <Dashboard />
            </Show>

            <Show when={tab() === 'Product Backlog'}>
                <ProductBacklog />
            </Show>
        </div>
    )
}

export default Product
