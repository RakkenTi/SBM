import { createSignal, onMount } from 'solid-js'
import { url } from './modules/client_config'
import PortalPage from './pages/Portal.js'
import { Route, Router } from '@solidjs/router'
import ProductPage from './pages/Product'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'

function App() {
    return (
        <div class="font-['Inter']">
            <Router>
                <Route path="/" component={PortalPage} />
                <Route path="/product" component={ProductPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/login" component={LoginPage}/>
            </Router>
        </div>
    )
}

export default App
