import express from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/create_user', async (req, res) => {
    try {
        // get user data sent from the frontend
        const { firstName, lastName, userID, password } = req.body

        const existingUser = await UserModel.findOne({ userID }) //check if userID exists

        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'User already exists! Choose a new username' })
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        console.log(
            'Received request to create user:',
            firstName,
            lastName,
            userID,
        ) // for debugging

        // create a new user object using the schema
        const user = new UserModel({
            firstName,
            lastName,
            userID,
            password: hashedPassword,
            products: [],
        })

        // save the user to MongoDB
        await user.save()

        res.status(201).json({ message: 'Success' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error })
    }
})

export default router
