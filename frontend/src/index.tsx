import { render } from 'solid-js/web'
import './App.css'
import './index.css'
import App from './App.js'

const root = document.getElementById('root')

if (root != null) {
    render(() => {
        return <App />
    }, root)
} else {
    console.log('Entrypoint failed.:')
}
