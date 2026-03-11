const express = require('express')
const bcrypt = require('bcrypt') //add bcyrpt for password encryption
const router = express.Router() // create a router for this file
const User = require('../../models/User')

router.post('/create_user', async (req, res) => {
    try{
        // get user data sent from the frontend
        const { firstName, lastName, userID, password } = req.body

        const existingUser = await User.findOne({ userID }) //check if userID exists 

        if (existingUser) {
            return res.status(400).json({ message: 'user already exists'}) 
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        console.log('Received request to create user:', firstName, lastName, userID) // for debugging
        
        // create a new user object using the schema
        const user = new User({
            firstName,
            lastName,
            userID,
            password: hashedPassword
        })

        // save the user to MongoDB
        await user.save()

        res.status(201).json({ message: 'Success'})

    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error })
    }

})

module.exports = router // export the route so the server can use it