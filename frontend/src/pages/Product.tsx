import { createSignal, For, Show, createResource, createEffect } from 'solid-js'
import ProfilePicture from '../components/profile_picture'
import NavButton from '../components/nav_button'
import Dashboard from './Dashboard'
import ProductBacklog from './ProductBacklog'
import SprintBacklog from './Sprint'
import { useParams } from '@solidjs/router'
import GenericLoading from '../components/GenericLoading'
import Management from './Manage'

// Import the global setters and types from your new store!
import {
    setGlobalProductData,
    setGlobalRefetch,
    IdentifiableProduct,
} from '../globals/store'

const navbar_buttons = [
    { name: 'Dashboard', icon: '' },
    { name: 'Product Backlog', icon: '' },
    { name: 'Sprint Backlog', icon: '' },
    { name: 'Manage', icon: '' },
]

function IProduct() {
    const params = useParams()
    const [tab, setTab] = createSignal(navbar_buttons[0].name)

    const fetchProductData = async (
        productName: string,
    ): Promise<IdentifiableProduct> => {
        console.log('Fetching product data from name:', productName)

        const res = await fetch(
            `/api/get_product_data?productName=${productName}`,
            {
                credentials: 'include',
            },
        )

        if (!res.ok) {
            throw new Error('No such product exists, or user is unauthorized.')
        }

        const data = (await res.json()) as IdentifiableProduct

        // 1. UPDATE THE GLOBAL STORE
        // This ensures the Modal has access to the PBLItems immediately!
        setGlobalProductData(data)

        return data
    }

    const [productData, { refetch }] = createResource<
        IdentifiableProduct,
        string
    >(() => params.productName, fetchProductData)

    // 2. EXPOSE THE REFETCH FUNCTION GLOBALLY
    // Using createEffect ensures it stays bound correctly if the component lifecycle updates
    createEffect(() => {
        setGlobalRefetch(() => refetch)
    })

    return (
        <div class="flex min-h-screen flex-col bg-slate-100">
            <Show when={productData.loading}>
                <GenericLoading />
            </Show>

            {/* Fix Error Rendering */}
            <Show when={productData.error}>
                <h1>
                    Error:{' '}
                    {productData.error?.message || 'Something went wrong'}
                </h1>
            </Show>

            <Show when={productData()}>
                {(product) => (
                    <section>
                        <header class="sticky inset-x-0 top-0 z-10 flex w-full flex-col bg-cyan-500 shadow-xl">
                            <div class="flex w-full justify-center p-8 pr-12 pl-12 md:justify-between">
                                <h1 class="text-4xl font-bold tracking-tight text-white">
                                    {product().productName}
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
                            <Dashboard data={product()} />
                        </Show>

                        <Show when={tab() === 'Product Backlog'}>
                            <ProductBacklog data={product()} />
                        </Show>

                        <Show when={tab() === 'Sprint Backlog'}>
                            <SprintBacklog data={product()} />
                        </Show>

                        <Show when={tab() === 'Manage'}>
                            <Management data={product()} />
                        </Show>
                    </section>
                )}
            </Show>
        </div>
    )
}

export default IProduct
