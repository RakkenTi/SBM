const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.post('/check_user', async (req, res) => {
    try {
        const { userID } = req.body

        if (!userID) {
            return res.status(400).json(false) // no id then return false
        }

        // search for user in MongoDB
        const userFind = await User.exists({ userID })

        // return true if id found, false if not
        res.status(200).json(!!userFind)

    } catch (error) {
        res.status(500).json(false)
    }
})

module.exports = router