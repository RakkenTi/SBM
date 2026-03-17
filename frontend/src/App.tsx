import { createEffect } from 'solid-js'
import PortalPage from './pages/Portal.js'
import { Route, Router, useLocation, useNavigate } from '@solidjs/router'
import ProductPage from './pages/Product'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import { clientData } from './globals/client_data'

function App() {
    return (
        <div class="font-['Inter']">
            <Router
                root={(props) => {
                    const navigate = useNavigate()

                    createEffect(() => {
                        if (!clientData.loggedIn) {
                            console.log(
                                'Logged out. Switching to login/register page.',
                            )
                            navigate('/login', { replace: true })
                        } else {
                            console.log('Logged in. Switching to portal.')
                            navigate('/', { replace: true })
                        }
                    })

                    return <>{props.children}</>
                }}
            >
                <Route path="/" component={PortalPage} />
                <Route path="/product" component={ProductPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
            </Router>
        </div>
    )
}

export default App
