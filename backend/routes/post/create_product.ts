import express from 'express'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'
import type { assignedSprints as AssignedSprintsType, userLevels as UserLevelsType } from '../../../shared/types'

const router = express.Router()

router.post('/create_product', async (req, res) => {
    try {
        const { productData } = req.body
        const userID: string = req.cookies.session_id

        // Validate user authentication
        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized: missing user ID' })
        }

        // Find user
        const userData = await UserModel.findById(userID)
        if (!userData) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (!userData.userName) {
            return res.status(400).json({ message: 'User data is incomplete (missing username)' })
        }

        // Check for duplicate product name
        const productExists = await ProductModel.findOne({ productName: productData.name })
        if (productExists) {
            return res.status(409).json({ message: 'Product with this name already exists.' })
        }

        const userLevels: UserLevelsType = {
            [userData.userName]: 'Product Owner',
        }

        // Create new product
        const product = new ProductModel({
            productName: productData.name,
            productDescription: productData.description,
            productUsers: [userID],
            userLevels: userLevels,
            assignedSprints: {},   
            sprintComplete: 0,
            sprintLeft: 0,
            estimatedTime: 0,
            numberSprints: 0,
            daysRemSprint: 0,
            daysRemProduct: 0,
            totalBudget: 0,
            PBLItems: [],
            Sprints: [],  
            teams: new Map(),         // ensure map is present
        })

        // Save product
        await product.save()

        // Associate product with user
        await UserModel.findByIdAndUpdate(userID, {
            $push: { products: product._id }
        })

        console.log('Product created!')
        res.status(201).json({ message: 'Product created', product })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create product' })
    }
})

export default router