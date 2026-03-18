import express from 'express'
import { ItemModel } from '../../models/Item'
const router = express.Router()

router.get('/all_items', async (_, res) => {
    try {
        // fetch all items from MongoDB
        const items = await ItemModel.find()

        // return them in JSON
        res.status(200).json({ items })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error })
    }
})

export default router
