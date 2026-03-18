import { createSignal, createMemo, For, Show, createResource } from 'solid-js'
import ProfilePicture from '../components/profile_picture'
import NavButton from '../components/nav_button'
import Dashboard from './Dashboard'
import ProductBacklog from './ProductBacklog'
import SprintBacklog from './Sprint'
import { useParams } from '@solidjs/router'
import LoadingModal from '../components/loading_modal'
import GenericLoading from './GenericLoading'

const navbar_buttons = [
    { name: 'Dashboard', icon: '' },
    { name: 'Product Backlog', icon: '' },
    { name: 'Sprint Backlog', icon: '' },
]

const [tab, setTab] = createSignal(navbar_buttons[0].name)

function Product() {
    const params = useParams()

    const fetchProductData = async (productName: string) => {
        console.log('Fetching product data from name:', productName)
        const res = await fetch(`/api/product/${productName}`, {
            credentials: 'include',
        })

        if (!res.ok)
            throw new Error('No such product exists, or user is unauthorized.')
        return res.json()
    }

    const [product] = createResource(() => params.productName, fetchProductData)

    return (
        <div class="flex min-h-screen flex-col bg-slate-100">
            {product.loading && <GenericLoading />}
            {product.error && <h1>Error: {product.error}</h1>}
            {product() && (
                <section>
                    <header class="sticky inset-x-0 top-0 z-10 flex w-full flex-col bg-cyan-500 shadow-xl">
                        <div class="flex w-full justify-center p-8 pr-12 pl-12 md:justify-between">
                            <h1 class="text-4xl font-bold tracking-tight text-white">
                                Product Name
                            </h1>
                            <div class="hidden md:block">
                                <ProfilePicture />
                            </div>
                        </div>
                        <nav class="flex w-full justify-center gap-4 bg-cyan-200 p-6 text-center shadow-xl md:gap-16 md:p-8">
                            <For each={navbar_buttons}>
                                {(item) => (
                                    <NavButton
                                        label={item.name}
                                        icon={item.icon}
                                        selected={() => tab()}
                                        callback={() => {
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

                    <Show when={tab() === 'Sprint Backlog'}>
                        <SprintBacklog />
                    </Show>
                </section>
            )}
        </div>
    )
}

export default Product
