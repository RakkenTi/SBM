import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import * as shared_config from '../shared/shared_config'

import getSession from './routes/get/get_session'
import getServerStatus from './routes/get/server_status'
import getDatabaseStatus from './routes/get/database_status'
import getAllItems from './routes/get/get_all_items'
import getAllProducts from './routes/get/get_all_products'
import getAllUsers from './routes/get/get_all_users'

import postCreateProductRouter from './routes/post/create_product'
import postCreateItemRouter from './routes/post/create_item'
import postCreateUser from './routes/post/create_user'
import postLogin from './routes/post/login'

import startMognooseHealthObserver from './mongoose/health_observer'
import applyScrumRules from './mongoose/scrum_rules'
import { setServers } from 'node:dns/promises'
import { config } from 'dotenv'
import { join } from 'node:path'

config()
setServers(['1.1.1.1', '8.8.8.8'])

// Connect to MongoDB
;(async () => {
    try {
        console.log('Attempting to connect to DB...')
        startMognooseHealthObserver()
        await mongoose.connect(process.env.MONGO_URI as any)
        applyScrumRules()
        console.log('DB Connected and Scrum Rules active.')
    } catch (error) {
        console.log('CRITICAL! Failed to connect to database!', error)
        process.exit(1)
    }
})()

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
const path = join(folderPath, 'index.html')
app.use(express.json())
app.use(cookieParser())

app.use('/api', getServerStatus)
app.use('/api', getDatabaseStatus)
app.use('/api', getAllUsers)
app.use('/api', getAllItems)
app.use('/api', getAllProducts)
app.use('/api', getSession)

app.use('/api', postCreateProductRouter)
app.use('/api', postCreateItemRouter)
app.use('/api', postCreateUser)
app.use('/api', postLogin)

// fallback to origin on invalid routes
// adresses Issue #23
app.use(express.static(folderPath))
app.get('/*splat', (_, res) => {
    console.log('Fallback route triggered')
    res.sendFile(path)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})
