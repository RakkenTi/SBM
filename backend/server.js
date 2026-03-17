const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")

const shared_config = require("./../shared/shared_config")

const getSession = require("./routes/get/get_session")

const getServerStatus = require('./routes/get/server_status')
const getDatabaseStatus = require('./routes/get/database_status')
// Vulnerabilities
// Kept for debugging
const getAllItems = require('./routes/get/get_all_items')
const getAllProducts = require("./routes/get/get_all_products")
const getAllUsers = require("./routes/get/get_all_users")

const postCreateProductRouter = require('./routes/post/create_product')
const postCreateItemRouter = require('./routes/post/create_item')
const postCreateUser = require("./routes/post/create_user")
const postLogin = require("./routes/post/login")

const startMognooseHealthObserver = require('./mongoose/health_observer')
const applyScrumRules = require('./mongoose/scrum_rules');

require('dotenv').config()
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])

// Connect to MongoDB
;(async () => {
    try {
        console.log('Attempting to connect to DB...')
        startMognooseHealthObserver()
        await mongoose.connect(process.env.MONGO_URI)
        applyScrumRules()
        console.log('DB Connected and Scrum Rules active.')
    } catch (error) {
        console.log('CRITICAL! Failed to connect to database!', error.message)
        process.exit(1)
    }
})()

const PORT = process.env.PORT
const app = express()
const origin = process.env.FRONTEND_URL || shared_config.localURL

// Middleware
app.use(cors({
    origin: origin,
    credentials: true // cookies
}))

console.log("Cors Origin is set to:", origin)

app.use(express.json())
app.use(cookieParser())

app.use(getServerStatus)
app.use(getDatabaseStatus)
app.use(getAllUsers)
app.use(getAllItems)
app.use(getAllProducts)
app.use(getSession)

app.use('/api', postCreateProductRouter)
app.use('/api', postCreateItemRouter)
app.use('/api', postCreateUser)
app.use('/api', postLogin)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})
