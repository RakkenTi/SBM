import { Component } from 'solid-js'
import LoadingModal from '../components/loading_modal'

const GenericLoading: Component = () => {
    return (
        <div class="flex min-h-screen items-center justify-center bg-slate-200">
            <LoadingModal label="Product Loading..." />
        </div>
    )
}
export default GenericLoading
