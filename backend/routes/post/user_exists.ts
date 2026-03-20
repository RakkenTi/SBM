import express from 'express'
const router = express.Router()
import { UserModel } from '../../models/User'
//asdasdsa

router.post('/check_user', async (req, res) => {
    try {
        const { userID } = req.body

        if (!userID) {
            return res.status(400).json(false) // no id then return false
        }

        // search for user in MongoDB
        const userFind = await UserModel.exists({ _id: userID })

        // return true if id found, false if not
        res.status(200).json(!!userFind)
    } catch (error) {
        res.status(500).json(false)
    }
})

export default router
