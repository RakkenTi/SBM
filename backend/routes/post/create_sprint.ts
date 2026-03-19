import express from 'express'
import { SprintModel } from '../../models/Sprint'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'

const router = express.Router()

router.post('/create_sprint', async (req, res) => {
    try {
        const { sprintData } = req.body
        const userID: string = req.cookies.session_id

        if (!userID) {
            return res.status(400).json({ message: 'Invalid user.' })
        }

        if (!sprintData?.goal || !sprintData?.productID) {
            return res.status(400).json({ message: 'Missing sprint data.' })
        }

        // get user
        const user = await UserModel.findById(userID)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }

        // get product
        const product = await ProductModel.findById(sprintData.productID)
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' })
        }

        // check role 
        const role = product.userLevels?.[user.userName as string]

        if (role !== 'Product Owner') {
            return res.status(403).json({
                message: 'Only Product Owners can create sprints'
            })
        }

        // create sprint
        const sprint = new SprintModel({
            goal: sprintData.goal,
            startDate: sprintData.startDate,
            endDate: sprintData.endDate,
            status: sprintData.status || 'Inactive',
            cost: sprintData.cost || 0,
            snapshots: [],
            tasks: [],
        })

        await sprint.save()

        // link sprint to product
        await ProductModel.findByIdAndUpdate(sprintData.productID, {
            $push: {
                assignedSprints: sprint._id,
            },
        })

        return res.status(201).json({
            message: 'Sprint created',
            sprint,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to create sprint',
        })
    }
})

export default router