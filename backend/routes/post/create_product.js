const express = require('express')
const router = express.Router()

router.post('/create_product', async (req, res) => {
    try {
        const { name, description } = req.body
        console.log('Received request to make Product: ', name, description)
        res.status(201).json({ message: 'Success' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error })
    }
})

module.exports = router
