import { createSignal, onMount } from 'solid-js'
import { url } from './modules/client_config'
import Portal from './pages/Portal.js'
import { Route, Router } from '@solidjs/router'
import Product from './pages/Product'

function App() {
    return (
        <div class="font-['Inter']">
            <Router>
                <Route path="/" component={Portal} />
                <Route path="/product" component={Product}></Route>
            </Router>
        </div>
    )
}

export default App
