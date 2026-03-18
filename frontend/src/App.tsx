import { createEffect, createSignal, onMount, Show } from 'solid-js'
import PortalPage from './pages/Portal.js'
import { Route, Router, useLocation, useNavigate } from '@solidjs/router'
import ProductPage from './pages/Product'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import { clientData, setClientData } from './globals/client_data'

function App() {
    const [isLoading, setIsLoading] = createSignal(true)

    onMount(async () => {
        try {
            const response = await fetch('/api/session', {
                credentials: 'include',
            })

            if (response.ok) {
                const data = await response.json()
                setClientData({
                    ...data,
                    loggedIn: true,
                })

                console.log('Logged in via cookie!')
                console.log('Client data:', clientData)
            } else {
                console.log('Request success but failed to log in.')
            }
        } catch (error) {
            console.error('Failed to login.')
        } finally {
            setIsLoading(false)
        }
    })

    return (
        <div class="font-['Inter']">
            <Show
                when={!isLoading()}
                fallback={
                    <div class="flex h-screen items-center justify-center font-bold text-slate-700">
                        Loading...
                    </div>
                }
            >
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
                    <Route
                        path="/product/:productName"
                        component={ProductPage}
                    />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/login" component={LoginPage} />
                </Router>
            </Show>
        </div>
    )
}

export default App
