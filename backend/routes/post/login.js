// this is just checking if userID exists - for log in

const express = require('express')
const router = express.Router() // create router for this file
const User = require('../../models/User')

router.post('/login', async (req, res) => {
    try {
        const { userID } = req.body // get userID from front end
        const user = await User.findOne({ userID }) // search db for userID

        if (user) res.status(200).json({ message: 'login successful' }) // found
        else res.status(404).json({ message: 'user not found' }) // not found
    } catch (error){
        res.status(500).json({ message: 'Login failed', error })    
    }
})
module.exports = router
