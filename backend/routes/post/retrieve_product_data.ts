import express from 'express'
import { ProductModel } from '../../models/Product'
const router = express.Router()

router.post('/get_user_product', async (req, res) => {
    try {
        const { userID, productName } = req.body

        //check if userID or ProductID is missing
        if (!userID || !productName) {
            return res
                .status(400)
                .json({ error: 'Missing userID or productName' })
        }

        //Check if product exists
        const product = await ProductModel.findOne({
            productName,
        })

        //If product does not exist return server error
        if (!product) {
            return res
                .status(404) // Still counts as client error if the product does not exist, as they gave an invalid name.
                .json({ error: 'Product not found' }) // ← fixed error message
        }

        const productUsers = product.productUsers
        // Convert ObjectIds to strings before comparing
        if (!productUsers.some(userId => userId.toString() === userID)) {
            return res
                .status(403)
                .json({ error: 'UserID is not in this product' })
        }
        //If product does exist return success
        res.status(200).json({ product })

        //catch general server error if try block does not run
    } catch (error) {
        console.error(error) // log for debugging
        res.status(500).json({ message: 'server error' }) // don't expose raw error
    }
})
module.exports = router
