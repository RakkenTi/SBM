import express from 'express'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'

const router = express.Router()

router.get('/get_product_data', async (req, res) => {
    try {
        // Use session cookie for authentication
        const userID = req.cookies.session_id
        const { productName } = req.query

        if (!userID) {
            return res.status(401).json({ message: 'Not authenticated' })
        }
        if (!productName) {
            return res.status(400).json({ message: 'Missing productName' })
        }

        //verify user exists
        const userExists = await UserModel.findById(userID)
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }

        const product = await ProductModel.findOne({ productName })
            .populate('Sprints')
            .populate('PBLItems')

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        if (!product.productUsers.some((id) => id.toString() === userID)) {
            return res.status(403).json({ message: 'User not in this product' })
        }

        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to get product' })
    }
})

export default router
