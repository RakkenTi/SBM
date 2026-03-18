import express from 'express'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/create_product', async (req, res) => {
    try {
        console.log('Received request to create product.')
        // get product data from the frontend
        const { productData } = req.body
        const userID: string = req.cookies.session_id

        const productExists = await ProductModel.findOne({
            productName: productData.name,
        })

        if (productExists) {
            console.log(
                `Product with name: ${productData.name} already exists.`,
            )
            return res.status(409).json({
                message: 'Product with this name already exists.',
            })
        } else {
            console.log('Product name is unique.')
        }

        if (!userID) {
            console.log('Received invalid user data. rejecting request.')
            res.status(400).json({ message: 'Invalid user data.' })
            return
        } else {
            console.log('User is authorized and authenticated..')
        }

        const userLevelsMap = new Map()

        userLevelsMap.set(userID, 'ProductOwner')

        // create new Product object
        // "||" means that if not defined set default to...
        const product = new ProductModel({
            productName: productData.name,
            productDescription: productData.description,
            productUsers: [userID],
            userLevels: userLevelsMap,
            assignedSprints: {},
            sprintComplete: 0,
            sprintLeft: 0,
            estimatedTime: 0,
            numberSprints: 0,
            daysRemSprint: 0,
            daysRemProduct: 0,
            PBLItems: [],
            SBLItems: [],
        })

        // save
        await product.save()

        // Add product entry to user's product array first
        const success = await UserModel.findByIdAndUpdate(userID, {
            $push: {
                products: productData._id,
            },
        })

        if (!success) {
            console.log('Failed to update user products data entry.')
            res.status(500).json({ message: 'Failed to update user data.' })
        } else {
            console.log('Product created!')
            res.status(201).json({ message: 'Product created', product })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to create product', error })
    }
})

export default router
