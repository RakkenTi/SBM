import express from 'express'
import { UserModel } from '../../models/User'
const router = express.Router()

router.get('/session', async (req, res) => {
    try {
        const sessionID = req.cookies.session_id // Requires 'cookie-parser' middleware

        console.log('Received request to retrieve session data')
        console.log('Session ID:', sessionID)

        if (!sessionID) {
            console.log('Session ID invalid!')
            return res.status(401).json({ loggedIn: false })
        }

        const user = await UserModel.findById(sessionID)
        if (!user) {
            console.log('No user found in db!')
            return res.status(404).json({ loggedIn: false })
        }

        const { firstName, lastName, userID: userName, products } = user
        console.log('Retrieved user data.')
        res.status(200).json({
            firstName,
            lastName,
            userName,
            userID: sessionID,
            products,
            loggedIn: true,
        })
    } catch (error) {
        console.error('Encountered error: ', error)
        res.status(500).json({ message: 'Session check failed' })
    }
})

export default router
