import express from 'express'
import { ItemModel } from '../../models/Item'
import { ProductModel } from '../../models/Product' // import Product model

const router = express.Router()

router.post('/create_item', async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            risk,
            status,
            teamLabel,
        } = req.body

        // Validate required fields
        if (!title) {
            return res.status(400).json({ message: 'title is required' })
        }
        if (!productId) {
            return res.status(400).json({ message: 'productId is required' })
        }

        // Check if product exists
        const product = await ProductModel.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Create item
        const item = new ItemModel({
            title,
            description,
            priority,
            risk,
            status,
            teamLabel,
        })

        await item.save()

        // Associate item with product
        product.PBLItems.push(item._id)
        await product.save()

        res.status(201).json({ message: 'Item created and added to product', item })
    } catch (error) {
        console.error(error) // log for debugging
        res.status(500).json({ message: 'Failed to create item' })
    }
})

export default router
