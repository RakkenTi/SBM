const mongoose = require('mongoose')

const startMognooseHealthObserver = () => {
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB.')
    })

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB error:', err)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB.')
    })

    console.log('MongoDB Health Observer started')
}

module.exports = startMognooseHealthObserver
