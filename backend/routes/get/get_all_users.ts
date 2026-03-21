// this is to fetch all the users - good for debugging and testing
import express from 'express'
import { UserModel } from '../../models/User'
const router = express.Router()

router.get('/users', async (_, res) => {
    try {
        const users = await UserModel.find().select('-password') // fetch all users
        res.status(200).json(users) // send to frontend
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users', error })
    }
})

export default router
