const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

router.post('/create_product', async (req, res) => {
    try {
        // get product data from the frontend
        const {
            productName,
            projectUsers,
            userLevel,
            assignedSprint,
            sprintComplete,
            sprintLeft,
            estimatedTime,
            numberSprints,
            daysRemSprint,
            daysRemProduct,
            PBLItems,
            SBLItems
        } = req.body

        // create new Product object
        // "||" means that if not defined set default to...
        const product = new Product({
            productName,
            projectUsers: projectUsers || [],
            userLevel: userLevel || {},
            assignedSprint: assignedSprint || {},
            sprintComplete: sprintComplete || 0,
            sprintLeft: sprintLeft || 0,
            estimatedTime: estimatedTime || 0,
            numberSprints: numberSprints || 0,
            daysRemSprint: daysRemSprint || 0,
            daysRemProduct: daysRemProduct || 0,
            PBLItems: PBLItems || [],
            SBLItems: SBLItems || []
        })

        // save
        await product.save()

        res.status(201).json({ message: 'Product created', product })

    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error })
    }
})

module.exports = router
