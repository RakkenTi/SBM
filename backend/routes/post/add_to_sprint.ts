// File: routes/post/add_item_to_sprint.ts
import express from 'express'
import { Types } from 'mongoose'
import { SprintModel } from '../../models/Sprint'
import { UserModel } from '../../models/User'
import { ProductModel } from '../../models/Product'

const router = express.Router()

router.post('/add_item_to_sprint', async (req, res) => {
    try {
        const { sprintID, itemID } = req.body
        const userID: string = req.cookies.session_id

        if (!userID) return res.status(401).json({ message: 'Invalid user.' })

        if (!sprintID || !itemID) {
            return res
                .status(400)
                .json({ message: 'Missing sprintID or itemID.' })
        }

        // Validate Object IDs
        if (
            !Types.ObjectId.isValid(sprintID) ||
            !Types.ObjectId.isValid(itemID)
        ) {
            return res.status(400).json({ message: 'Invalid ID format.' })
        }

        // Get user & verify permissions (Optional: Restrict to PO/Scrum Master)
        const user = await UserModel.findById(userID)
        if (!user) return res.status(404).json({ message: 'User not found.' })

        const sprint = await SprintModel.findById(sprintID)
        if (!sprint)
            return res.status(404).json({ message: 'Sprint not found.' })

        if (sprint.status === 'Completed') {
            return res
                .status(403)
                .json({ message: 'Cannot add tasks to a completed sprint.' })
        }

        // Prevent adding the same item twice
        if (sprint.tasks.includes(itemID as any)) {
            return res
                .status(400)
                .json({ message: 'Item is already in this sprint.' })
        }

        // Add the item to the sprint's tasks array
        sprint.tasks.push(itemID as any)
        await sprint.save()

        res.status(200).json({
            message: 'Item added to sprint successfully',
            sprint,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to add item to sprint', error })
    }
})

export default router
