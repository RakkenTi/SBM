// this is to fetch all the teams - good for debugging and testing
import express from 'express'
import { TeamsModel } from '../../models/Teams'
const router = express.Router()

router.get('/teams', async (_, res) => {
    try {
        const teams = await TeamsModel.find() // fetch all teams
        res.status(200).json(teams) // send to frontend
    } catch (error) {
        res.status(500).json({ message: 'Failed to get team', error })
    }
})

export default router
