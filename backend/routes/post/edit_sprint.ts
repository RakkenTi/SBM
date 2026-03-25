import express from 'express'
import { Types } from 'mongoose'
import { SprintModel } from '../../models/Sprint'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'

const router = express.Router()

router.post('/edit_sprint', async (req, res) => {
    try {
        const { sprintID, updatedData } = req.body
        const userID: string = req.cookies.session_id

        if (!userID) {
            return res.status(400).json({ message: 'Invalid user.' })
        }

        if (!sprintID || !updatedData) {
            return res.status(400).json({
                message: 'Missing required fields: sprintID and updatedData are required.'
            })
        }

        if (!Types.ObjectId.isValid(sprintID)) {
            return res.status(400).json({
                message: 'Invalid sprintID format'
            })
        }

        // get user
        const user = await UserModel.findById(userID)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        if (!user.userName) {
            return res.status(400).json({ message: 'User has no username set.' })
        }

        // check if sprint exists
        const sprint = await SprintModel.findById(sprintID)

        if (!sprint) {
            return res.status(404).json({
                message: 'Sprint not found with the provided sprintID'
            })
        }

        // check if sprint is active (in action)
        if (sprint.status === 'Active') {
            return res.status(403).json({
                message: 'Cannot edit sprint while it is active'
            })
        }

        // find the product that contains this sprint to check permissions
        const product = await ProductModel.findOne({ Sprints: sprintID })
        if (!product) {
            return res.status(404).json({ message: 'Product not found for this sprint.' })
        }

        // check role - only Product Owners can edit sprints
        const role = product.userLevels?.get(user.userName)
        if (role !== 'Product Owner') {
            return res.status(403).json({
                message: 'Only Product Owners can edit sprints',
            })
        }


        // update allowed fields
        if (updatedData.goal !== undefined) sprint.goal = updatedData.goal
        if (updatedData.startDate !== undefined) sprint.startDate = updatedData.startDate
        if (updatedData.endDate !== undefined) sprint.endDate = updatedData.endDate
        if (updatedData.cost !== undefined) sprint.cost = updatedData.cost
        if (updatedData.status !== undefined) sprint.status = updatedData.status

        // save the updated sprint to MongoDB
        await sprint.save()

        res.status(200).json({
            message: 'Sprint updated successfully',
            sprintID: sprint._id,
            updatedSprint: sprint
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to edit sprint', error })
    }
})

export default router