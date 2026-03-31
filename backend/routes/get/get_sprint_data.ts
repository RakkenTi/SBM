import express from 'express'
import { SprintModel } from '../../models/Sprint'
import { UserModel } from '../../models/User'

const router = express.Router()

router.get('/get_sprint_data', async (req, res) => {
    try {
        const userID = req.cookies.session_id
        const { sprintId } = req.query

        if (!userID) {
            return res.status(401).json({ message: 'Not authenticated' })
        }
        if (!sprintId) {
            return res.status(400).json({ message: 'Missing sprintId' })
        }

        const userExists = await UserModel.findById(userID)
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }

        const sprint = await SprintModel.findById(sprintId).populate('tasks')

        if (!sprint) {
            return res.status(404).json({ message: 'Sprint not found' })
        }

        res.status(200).json(sprint)
    } catch (error) {
        console.error('Error fetching sprint:', error)
        res.status(500).json({ message: 'Failed to get sprint data' })
    }
})

export default router
