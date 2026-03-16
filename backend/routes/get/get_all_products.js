const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')

router.get('/all', async (req, res) => {
    try {
        // Fetch all products from MongoDB
        const products = await Product.find()

        // Send them back in JSON
        res.status(200).json({ products })

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error })
    }
})

module.exports = router