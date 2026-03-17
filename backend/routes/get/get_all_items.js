const express = require('express')
const router = express.Router()
const Item = require('../../models/Item')

router.get('/all_items', async (req, res) => {
    try {
        // fetch all items from MongoDB
        const items = await Item.find()

        // return them in JSON
        res.status(200).json({ items })

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error })
    }
})

module.exports = router