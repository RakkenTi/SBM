import express from 'express'
import { UserModel } from '../../models/User'
const router = express.Router()

router.post('/check_user', async (req, res) => {
    try {
        const { userID } = req.body

        if (!userID) {
            return res.status(400).json(false) // no id then return false
        }

        // search for user in MongoDB
        const userFind = await UserModel.exists({ userID })

        // return true if id found, false if not
        res.status(200).json(!!userFind)
    } catch (error) {
        res.status(500).json(false)
    }
})

export default router
