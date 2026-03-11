// this is to fetch all the users - good for debugging and testing

const express = require('express')
const router = express.Router() // create router for this file
const User = require('../../models/User')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find() // fetch all users
        res.status(200).json(users) // send to frontend
    } catch (error) {
       res.status(500).json({ message: 'Failed to get users', error }) 
    }
})

module.exports = router