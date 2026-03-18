import express from 'express'
const router = express.Router()
import { ProductModel } from '../../models/Product'

router.get('/all_products', async (_, res) => {
    try {
        // Fetch all products from MongoDB
        const products = await ProductModel.find()

        // Send them back in JSON
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error })
    }
})

export default router
