import express from 'express'
import { ProductModel } from '../../models/Product'
const router = express.Router()

router.get('/product/:productName', async (req, res) => {
    try {
        const { productName } = req.params
        const userID: string = req.cookies.session_id
        console.log(
            `Client of id ${userID} attempting to fetch product of name: ${productName}`,
        )

        if (!userID) {
            console.log('No userID.')
            return res.status(401).json({
                error: 'User is not authenticated! Unauthorized. Missing session cookie.',
            })
        }
        console.log('UserID exists.')

        console.log('Searching model for document....')
        const product = await ProductModel.findOne({ productName })

        if (!product) {
            console.log(`Product of name ${productName} does not exist.`)
            return res.status(404).json({
                error: 'No product of such name exists.',
            })
        } else {
            console.log('Document found.')
        }

        const productUsers = product.productUsers

        const isAuthorized = productUsers.some(
            (userId) => userId.toString() === userID,
        )
        if (!isAuthorized) {
            console.log('User is not authorized. (Missing from productUsers)')
            return res.status(403).json({
                error: 'No authorization to view product. (Missing from user list.)',
            })
        } else {
            console.log('User is authorized.')
        }

        res.status(200).json({ product })
        console.log('Request success')
    } catch (error) {
        console.log('Cannot GET product: ', error)
        res.status(500).json({
            message: 'Server encountered error.',
        })
    }
})

const ProductRoute = router

export default ProductRoute
