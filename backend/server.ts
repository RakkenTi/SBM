import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { setServers } from 'node:dns/promises'
import { config } from 'dotenv'

import * as shared_config from '../shared/shared_config'
import startMognooseHealthObserver from './mongoose/health_observer'
import applyScrumRules from './mongoose/scrum_rules'

config()
setServers(['1.1.1.1', '8.8.8.8'])

const PORT = process.env.PORT
const app = express()
const originURL = process.env.FRONTEND_URL || shared_config.localClientURL

// Middleware
app.use(
    cors({
        origin: originURL,
        credentials: true, // cookies
    }),
)

console.log('Cors Origin is set to:', originURL)

const folderPath = join(__dirname, '../../frontend/dist')
const htmlPath = join(folderPath, 'index.html')

app.use(express.json())
app.use(cookieParser())

const loadModels = async (dir: string) => {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = join(dir, entry.name)

        if (entry.isDirectory()) {
            await loadModels(fullPath)
        } else if (entry.name.match(/\.(ts|js)$/)) {
            try {
                const modelUrl = pathToFileURL(fullPath).toString()
                await import(modelUrl)
                console.log(`Loaded model: ${entry.name}`)
            } catch (err) {
                console.error(`Failed to load model from ${entry.name}:`, err)
            }
        }
    }
}

const loadRoutes = async (dir: string) => {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = join(dir, entry.name)

        if (entry.isDirectory()) {
            await loadRoutes(fullPath)
        } else if (entry.name.match(/\.(ts|js)$/)) {
            try {
                const routeUrl = pathToFileURL(fullPath).toString()
                const routeModule = await import(routeUrl)

                if (routeModule.default) {
                    app.use('/api', routeModule.default)
                    console.log(`Loaded route: /api from ${entry.name}`)
                }
            } catch (err) {
                console.error(`Failed to load route from ${entry.name}:`, err)
            }
        }
    }
}

// --- Server Startup ---

const startServer = async () => {
    try {
        console.log('Attempting to connect to DB...')
        startMognooseHealthObserver()
        await mongoose.connect(process.env.MONGO_URI as any)

        const modelsDirectory = join(__dirname, 'models')
        await loadModels(modelsDirectory)

        applyScrumRules()
        console.log('DB Connected and Scrum Rules active.')
    } catch (error) {
        console.log('CRITICAL! Failed to connect to database!', error)
        process.exit(1)
    }

    const routesDirectory = join(__dirname, 'routes')
    await loadRoutes(routesDirectory)

    app.use(express.static(folderPath))
    app.get('/*splat', (_, res) => {
        console.log('Fallback route triggered')
        res.sendFile(htmlPath)
    })

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`)
    })
}

startServer()
