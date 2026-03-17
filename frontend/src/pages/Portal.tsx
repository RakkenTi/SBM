import { createSignal, createMemo, For, Show, createEffect } from 'solid-js'
import {
    GENERIC_ALPHANUMERIC_REGEX,
    MAX_PROJECT_DESCRIPTION_CHARS,
    MAX_PROJECT_NAME_CHARS,
} from '../../../shared/shared_config'
import ConfirmModal from '../components/confirm_modal'
import LoadingModal from '../components/loading_modal'
import { CLIENT_URL } from '../globals/client_config'
import ProfilePicture from '../components/profile_picture'
import Line from '../components/line'
import ModalContainer from '../components/modal_container'
import { clientData } from '../globals/client_data'
import { JSX } from 'solid-js/h/jsx-runtime'
import { updateProductList } from './Login'

const [newProductData, setNewProductData] = createSignal({
    name: '',
    description: '',
})

const [displayedModal, setDisplayModal] = createSignal<
    'NONE' | 'CONFIRM' | 'LOADING'
>('NONE')

const getCreateButtonColour = createMemo(() => {
    const data = newProductData()
    if (data.description.trim().length <= 0 || data.name.trim().length <= 0) {
        return `bg-gray-400`
    } else {
        return `bg-green-400 hover:bg-green-500`
    }
})

const promptConfirmCreateNewProduct: JSX.EventHandler<
    HTMLFormElement,
    SubmitEvent
> = (event) => {
    event.preventDefault()
    if (event.currentTarget.checkValidity()) {
        setDisplayModal('CONFIRM')
    }
}

const createContent = (
    <div class="flex flex-col gap-4 p-4">
        <h2 class="text-center text-2xl font-bold">Create A New Product</h2>
        <form onSubmit={promptConfirmCreateNewProduct} class="space-y-6">
            <div class="flex flex-col gap-2">
                <label class="pl-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Product Name
                </label>
                <input
                    type="text"
                    value={newProductData().name}
                    pattern={GENERIC_ALPHANUMERIC_REGEX}
                    required
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
                    required
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
                type="submit"
                class={`w-full rounded-xl border-4 border-gray-100 p-4 text-xl font-bold hover:cursor-pointer ${getCreateButtonColour()}`}
            >
                Create
            </button>
        </form>
    </div>
)

const viewProductsContent = (
    <div class="flex flex-col gap-4 p-2 md:p-4">
        <h2 class="text-center text-2xl font-bold">Product List</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <For each={clientData.assignedProducts}>
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
    try {
        console.log('Sending to server')
        const response = await fetch(CLIENT_URL + '/api/create_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productData: data,
                userData: {
                    productOwner: clientData.userID,
                },
            }),
        })

        if (response.ok) {
            console.log('OK')
            setDisplayModal('NONE')
        } else {
            console.log('NOT OK')
            alert('Failed to create product. Try again later.')
            setDisplayModal('NONE')
        }

        await updateProductList()
    } catch (error) {
        console.log('ERROR:', error)
    }
}

function Portal() {
    const [action, setAction] = createSignal(actions[1].id)

    createEffect(() => {
        action()
        updateProductList()
    })

    return (
        <div class="min-h-screen bg-slate-100">
            <ModalContainer
                state={displayedModal}
                stateSetter={setDisplayModal}
                modals={[
                    {
                        state_name: 'CONFIRM',
                        content: (
                            <ConfirmModal
                                title="Create Product"
                                acceptCallback={AcceptCreateProduct}
                                rejectCallback={RejectCreateProduct}
                            />
                        ),
                    },
                    {
                        state_name: 'LOADING',
                        content: <LoadingModal label="Creating Product" />,
                    },
                ]}
            />

            <header class="fixed inset-x-0 top-0 z-10 w-full bg-cyan-500 p-8 pr-12 pl-12 text-center shadow-xl md:flex md:justify-between">
                <h1 class="text-3xl font-bold tracking-tight text-white md:italic">
                    SBM Portal
                </h1>
                <div class="hidden items-center gap-4 md:flex">
                    <ProfilePicture />
                    <h1 class="text-2xl font-bold text-white">
                        Welcome, {clientData.firstName} {clientData.lastName}.
                    </h1>
                </div>
            </header>

            <main class="flex min-h-screen flex-col justify-center pt-50 text-gray-700 transition-all duration-300 md:pt-25">
                <div class="my-4 text-gray-700">
                    <h1 class="animate-fade-in p-8 text-center text-xl font-bold tracking-tight text-slate-300 md:p-0 md:text-3xl">
                        {clientData.firstName} {clientData.lastName},
                    </h1>
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
