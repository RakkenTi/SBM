import { createSignal, createMemo, For, Show } from 'solid-js'
import {
    MAX_PROJECT_DESCRIPTION_CHARS,
    MAX_PROJECT_NAME_CHARS,
} from '../modules/product_config'
import ConfirmModal from '../components/confirm_modal'
import LoadingModal from '../components/loading_modal'
import { url } from '../modules/client_config'
import ProfilePicture from '../components/profile_picture'
import Line from '../components/line'

const [newProductData, setNewProductData] = createSignal({
    name: '',
    description: '',
})

const [displayedModal, setDisplayModal] = createSignal<
    'NONE' | 'CONFIRM' | 'LOADING'
>('NONE')

const [products, setProducts] = createSignal([
    { name: 'Sample Product', description: 'Sample product description' },
    { name: 'Sample Product 2', description: 'Sample product description 2' },
    {
        name: 'Lorem Ipsum Product',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nostrum blanditiis possimus dignissimos commodi. Vitae, repellat. Inventore at ratione ipsa quod iusto repellat incidunt? Deleniti minima perferendis dolorem molestiae aperiam?',
    },
])

const getCreateButtonColour = createMemo(() => {
    const data = newProductData()
    if (data.description.trim().length <= 0 || data.name.trim().length <= 0) {
        return `bg-gray-400`
    } else {
        return `bg-green-400 hover:bg-green-500`
    }
})

const promptConfirmCreateNewProduct = () => {
    setDisplayModal('CONFIRM')
}

const createContent = (
    <div class="flex flex-col gap-4 p-4">
        <h2 class="text-center text-2xl font-bold">Create A New Product</h2>
        <div class="space-y-6">
            <div class="flex flex-col gap-2">
                <label class="pl-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Product Name
                </label>
                <input
                    type="text"
                    value={newProductData().name}
                    maxLength={MAX_PROJECT_NAME_CHARS}
                    placeholder="e.g. Task-list Manager"
                    class="w-full rounded-xl border-4 border-gray-200 bg-gray-100 p-4 text-xl transition-colors outline-none focus:border-cyan-400"
                    onInput={(e) =>
                        setNewProductData(() => {
                            const data = newProductData()
                            return {
                                name: e.target.value,
                                description: data.description,
                            }
                        })
                    }
                />
            </div>

            <div class="flex flex-col gap-2">
                <label class="pl-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Description
                </label>
                <textarea
                    value={newProductData().description}
                    maxLength={MAX_PROJECT_DESCRIPTION_CHARS}
                    placeholder="A simple task manager inspired like trello!"
                    rows="8"
                    class="w-full resize-none rounded-xl border-4 border-gray-200 bg-gray-100 p-4 text-lg transition-colors outline-none focus:border-cyan-400"
                    onInput={(e) =>
                        setNewProductData(() => {
                            const data = newProductData()
                            return {
                                name: data.name,
                                description: e.target.value,
                            }
                        })
                    }
                />
            </div>

            <button
                onclick={promptConfirmCreateNewProduct}
                class={`w-full rounded-xl border-4 border-gray-100 p-4 text-xl font-bold hover:cursor-pointer ${getCreateButtonColour()}`}
            >
                Create
            </button>
        </div>
    </div>
)

const viewProductsContent = (
    <div class="flex flex-col gap-4 p-2 md:p-4">
        <h2 class="text-center text-2xl font-bold">Product List</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <For each={products()}>
                {(product) => (
                    <a
                        href="/product"
                        class="shado-sm flex w-full flex-col gap-4 rounded-xl border-4 border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md active:scale-95 md:p-6"
                    >
                        <h2 class="text-xl font-bold">{product.name}</h2>
                        <h3 class="line-clamp-4 text-lg font-semibold text-gray-400">
                            {product.description}
                        </h3>
                    </a>
                )}
            </For>
        </div>
    </div>
)

const actions = [
    { id: 'Create', label: 'Create Product', content: createContent },
    {
        id: 'ViewProducts',
        label: 'View Products',
        content: viewProductsContent,
    },
]
const RejectCreateProduct = () => {
    setDisplayModal('NONE')
}

const AcceptCreateProduct = async () => {
    const data = newProductData()
    setDisplayModal('LOADING')
    console.log('Attempting')
    try {
        console.log('Sending to server')
        const response = await fetch(url + '/api/create_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.ok) {
            console.log('OK')
        } else {
            console.log('NOT OK')
        }
    } catch (error) {
        console.log('ERROR:', error)
    }
}

function Portal() {
    const [action, setAction] = createSignal(actions[1].id)

    return (
        <div class="min-h-screen bg-slate-100">
            <div
                class={`fixed inset-0 z-10 flex w-full items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300 ${
                    displayedModal() === 'NONE'
                        ? 'pointer-events-none opacity-0'
                        : 'pointer-events-auto opacity-100'
                }`}
            >
                <div
                    class={`absolute transition-all duration-300 ${
                        displayedModal() === 'CONFIRM'
                            ? 'scale-100 opacity-100'
                            : 'scale-0 opacity-0'
                    } `}
                >
                    <ConfirmModal
                        title="Create Product"
                        acceptCallback={AcceptCreateProduct}
                        rejectCallback={RejectCreateProduct}
                    />
                </div>
                <div
                    class={`absolute transition-all duration-300 ${
                        displayedModal() === 'LOADING'
                            ? 'scale-100 opacity-100'
                            : 'scale-0 opacity-0'
                    } `}
                >
                    <LoadingModal label="Creating Product" />
                </div>
            </div>

            <header class="fixed inset-x-0 top-0 z-10 w-full bg-cyan-500 p-8 pr-12 pl-12 text-center shadow-xl md:flex md:justify-between">
                <h1 class="text-3xl font-bold tracking-tight text-white md:italic">
                    SBM Portal
                </h1>
                <div class="hidden items-center gap-4 md:flex">
                    <ProfilePicture />
                    <h1 class="text-2xl font-bold text-white">
                        Welcome, User.
                    </h1>
                </div>
            </header>

            <main class="flex min-h-screen flex-col justify-center pt-50 text-gray-700 transition-all duration-300 md:pt-25">
                <div class="my-4 text-gray-700">
                    <h1 class="animate-fade-in p-8 text-center text-4xl font-bold tracking-tight md:p-0 md:text-6xl">
                        What would you like to do?
                    </h1>
                    <Line />
                </div>

                <section class="flex flex-col justify-center gap-20 pt-5 lg:flex-row">
                    {/*Left Side / Above*/}
                    <section class="grid grid-cols-2 justify-center gap-8 p-8 pt-10 md:grid-cols-2">
                        <For each={actions}>
                            {(item, i) => (
                                <button
                                    style={{
                                        'animation-delay': `${i() * 100 + 200}ms`,
                                    }}
                                    class={`animate-slide-up grounded-xl rounded-4xl border-4 p-4 opacity-0 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-400 hover:shadow-md active:scale-95 md:aspect-square md:p-8 ${action() === item.id ? 'border-cyan-400 bg-cyan-100' : 'border-gray-200 bg-white'}`}
                                    onClick={() => setAction(item.id)}
                                >
                                    <span class="text-center text-sm font-bold uppercase md:text-xl">
                                        {item.label}
                                    </span>
                                </button>
                            )}
                        </For>
                    </section>

                    {/*Right Side / Below*/}
                    <section class="w-full p-4 md:w-1/3 md:p-8">
                        <div
                            style={{ 'animation-delay': '400ms' }}
                            class="animate-slide-up flex w-full items-center justify-center overflow-hidden overflow-y-auto rounded-3xl bg-white p-4 opacity-0 shadow-xl"
                        >
                            <For each={actions}>
                                {(item) => (
                                    <Show when={action() === item.id}>
                                        <div class="p-4">{item.content}</div>
                                    </Show>
                                )}
                            </For>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    )
}

export default Portal
