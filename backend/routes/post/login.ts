// this is just checking if userID exists - for log in
import bcrypt from 'bcrypt'
import express from 'express'
import { UserModel } from '../../models/User'
const router = express.Router() // create router for this file

router.post('/login', async (req, res) => {
    try {
        const { userID, password } = req.body // get userID from front end

        const user = await UserModel.findOne({ userID }) // search db for userID

        if (!user || !user.password) {
            return res.status(404).json({ message: 'user not found' }) // not found user
        }

        const match = await bcrypt.compare(password, user.password) // compare password

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' }) // password doesn't match
        }

        // logged in by this point
        res.cookie('session_id', user._id.toString(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'lax',
            secure: false,
            path: '/',
        })

        const { firstName, lastName, products } = user //get user name
        res.status(200).json({ firstName, lastName, userID, products }) // success
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error })
    }
})

export default router
