const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['Task', 'UserStory'], default: 'Task' },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    effort: { type: Number, default: 0 },
    risk: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    teamLabel: String,
    isLocked: { type: Boolean, default: false },
})

module.exports = mongoose.model('Item', ItemSchema)
