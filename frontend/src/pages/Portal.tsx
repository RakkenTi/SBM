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
                <label class="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">
                    Product Name
                </label>
                <input
                    type="text"
                    value={newProductData().name}
                    maxLength={MAX_PROJECT_NAME_CHARS}
                    placeholder="e.g. Task-list Manager"
                    class="w-full bg-gray-100 border-4 border-gray-200 p-4 rounded-xl text-xl outline-none focus:border-cyan-400 transition-colors"
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
                <label class="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">
                    Description
                </label>
                <textarea
                    value={newProductData().description}
                    maxLength={MAX_PROJECT_DESCRIPTION_CHARS}
                    placeholder="A simple task manager inspired like trello!"
                    rows="8"
                    class="w-full bg-gray-100 border-4 border-gray-200 p-4 rounded-xl text-lg outline-none focus:border-cyan-400 transition-colors resize-none"
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
                class={`font-bold border-4 hover:cursor-pointer border-gray-100 p-4 rounded-xl w-full text-xl ${getCreateButtonColour()}`}
            >
                Create
            </button>
        </div>
    </div>
)

const viewProductsContent = (
    <div class="flex flex-col gap-4 p-2 md:p-4">
        <h2 class="text-center text-2xl font-bold">Product List</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <For each={products()}>
                {(product) => (
                    <a
                        href="/product"
                        class="hover:shadow-md active:scale-95 hover:-translate-y-1 shado-sm transition-all flex flex-col gap-4 p-4 md:p-6 bg-gray-50 w-full rounded-xl border-4 border-gray-100"
                    >
                        <h2 class="font-bold text-xl">{product.name}</h2>
                        <h3 class="font-semibold text-gray-400 text-lg line-clamp-4">
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
                class={`flex justify-center items-center w-full z-10 fixed inset-0 transition-all duration-300 bg-black/40 backdrop-blur-xs ${
                    displayedModal() === 'NONE'
                        ? 'opacity-0 pointer-events-none'
                        : 'opacity-100 pointer-events-auto'
                }`}
            >
                <div
                    class={`
                    absolute transition-all duration-300 ${
                        displayedModal() === 'CONFIRM'
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-0'
                    }
                    `}
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
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-0'
                    }
                    `}
                >
                    <LoadingModal label="Creating Product" />
                </div>
            </div>

            <header class="fixed w-full text-center inset-x-0 z-10 top-0 p-8 pl-12 pr-12 bg-cyan-500 shadow-xl md:flex md:justify-between">
                <h1 class="text-3xl text-white font-bold md:italic tracking-tight ">
                    SBM Portal
                </h1>
                <div class="hidden md:flex items-center gap-4">
                    <ProfilePicture />
                    <h1 class="text-2xl text-white font-bold">
                        Welcome, User.
                    </h1>
                </div>
            </header>

            <main class="pt-50 md:pt-25 text-gray-700 flex flex-col justify-center min-h-screen transition-all duration-300">
                <div class="text-gray-700 my-4">
                    <h1 class="p-8 md:p-0 text-4xl md:text-6xl text-center font-bold tracking-tight animate-fade-in">
                        What would you like to do?
                    </h1>
                    <Line />
                </div>

                <section class="pt-5 flex flex-col lg:flex-row gap-20 justify-center">
                    {/*Left Side / Above*/}
                    <section class="pt-10 p-8 justify-center grid grid-cols-2 md:grid-cols-2 gap-8">
                        <For each={actions}>
                            {(item, i) => (
                                <button
                                    style={{
                                        'animation-delay': `${i() * 100 + 200}ms`,
                                    }}
                                    class={`p-4 md:p-8 animate-slide-up opacity-0 hover:shadow-md active:scale-95 hover:-translate-y-1 shadow-sm transition-all md:aspect-square rounded-4xl border-4 hover:border-cyan-400 grounded-xl 
                                        ${action() === item.id ? 'bg-cyan-100 border-cyan-400' : 'border-gray-200 bg-white'}`}
                                    onClick={() => setAction(item.id)}
                                >
                                    <span class="text-center text-sm md:text-xl font-bold uppercase">
                                        {item.label}
                                    </span>
                                </button>
                            )}
                        </For>
                    </section>

                    {/*Right Side / Below*/}
                    <section class="p-4 md:p-8 w-full md:w-1/3">
                        <div
                            style={{ 'animation-delay': '400ms' }}
                            class="w-full p-4 flex animate-slide-up opacity-0 shadow-xl overflow-y-auto overflow-hidden items-center justify-center bg-white rounded-3xl"
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
