const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

router.post('/create_product', async (req, res) => {
    try {
        // get product data from the frontend
        const {
            productData,
            userData
        } = req.body

        const userLevelsMap = new Map()
        if (!userData.productOwner)
        {
            console.log("Received invalid user data. rejecting request.")
            res.status(400).json({message: "Invalid user data."})
            return
        }

        const productOwner = userData.productOwner
        userLevelsMap.set(productOwner, "ProductOwner")

        // create new Product object
        // "||" means that if not defined set default to...
        const product = new Product({
            productName: productData.name,
            productDescription: productData.description,
            productUsers: [productOwner],
            userLevels: userLevelsMap,
            assignedSprints:  {},
            sprintComplete: 0,
            sprintLeft: 0,
            estimatedTime: 0,
            numberSprints: 0,
            daysRemSprint: 0,
            daysRemProduct: 0,
            PBLItems: [],
            SBLItems: []
        })

        // save
        await product.save()

        res.status(201).json({ message: 'Product created', product })

    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error })
    }
})

module.exports = router
