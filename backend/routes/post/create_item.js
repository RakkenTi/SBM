const express = require('express')
const router = express.Router()
const Item = require('../../models/Item')

router.post('/create_item', async (req, res) => {

    try {
        // get item data from frontend
        const {
            title,
            description,
            type,
            priority,
            status,
            effort,
            risk,
            teamLabel,
            isLocked
        } = req.body

        // create new Item object
        // "||" means that if not defined set default to...
        const item = new Item({
            title,
            description: description || '',
            type: type || 'Task',
            priority: priority || 'Medium',
            status: status || 'To Do',
            effort: effort || 0,
            risk: risk || 'Low',
            teamLabel: teamLabel || '',
            isLocked: isLocked || false
        })

        await item.save()

        res.status(201).json({ message: 'Item created', item })

    } catch (error) {
        res.status(500).json({ message: 'Failed to create item', error })
    }
})

module.exports = router
