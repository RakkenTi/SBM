import express from 'express'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/create_product', async (req, res) => {
    try {
        // get product data from the frontend
        const { productData, userData } = req.body

        const productExists = await ProductModel.findOne({
            productName: productData.name,
        })

        if (productExists) {
            return res.status(409).json({
                message: 'Product with this name already exists.',
            })
        }

        if (!userData || !userData.productOwner) {
            console.log('Received invalid user data. rejecting request.')
            res.status(400).json({ message: 'Invalid user data.' })
            return
        }

        const productOwner = userData.productOwner
        const userLevelsMap = new Map()

        userLevelsMap.set(productOwner, 'ProductOwner')

        // create new Product object
        // "||" means that if not defined set default to...
        const product = new ProductModel({
            productName: productData.name,
            productDescription: productData.description,
            productUsers: [productOwner],
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
        await UserModel.findOneAndUpdate(
            { userID: productOwner },
            {
                $push: {
                    products: productData.name, //_idis metadata
                },
            },
        )

        res.status(201).json({ message: 'Product created', product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to create product', error })
    }
})

export default router
