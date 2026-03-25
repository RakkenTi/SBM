// this is just checking if userID exists - for log in
import bcrypt from 'bcrypt'
import express from 'express'
import { UserModel } from '../../models/User'

const router = express.Router() // create router for this file

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body // get userID from front end

        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' })
        }

        console.log('Cient attempting to login...')
        console.log(`Username: ${userName}`)

        const user = await UserModel.findOne({ userName }) // search db for userID

        if (!user) {
            console.log('No user found!')
            return res.status(404).json({ message: 'user not found' }) // not found user
        }

        const match = await bcrypt.compare(password, user.password) // compare password

        if (!match) {
            console.log('Wrong password!')
            return res.status(401).json({ message: 'Incorrect password' }) // password doesn't match
        }

        const userID = user._id.toString()

        // logged in by this point
        res.cookie('session_id', userID, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'lax',
            secure: false,
            path: '/',
        })

        const { firstName, lastName, products } = user //get user name
        res.status(200).json({
            firstName,
            lastName,
            userName,
            userID,
            products,
        }) // success
        console.log('Login success!')
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error })
    }
})

export default router
