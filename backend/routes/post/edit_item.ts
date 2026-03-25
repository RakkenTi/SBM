import express from 'express'
import { Types } from 'mongoose'
import { ItemModel } from '../../models/Item'
import { ProductModel } from '../../models/Product'
import { UserModel } from '../../models/User'

const router = express.Router()

router.post('/edit_item', async (req, res) => {
    try {
        const { itemID, updatedData } = req.body
        const userID: string = req.cookies.session_id

        if (!userID) {
            return res.status(400).json({ message: 'Invalid user.' })
        }

        if (!itemID || !updatedData) {
            return res.status(400).json({
                message: 'Missing required fields: itemID and updatedData are required.'
            })
        }

        if (!Types.ObjectId.isValid(itemID)) {
            return res.status(400).json({
                message: 'Invalid itemID format'
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

        // check if item exists
        const item = await ItemModel.findById(itemID)

        if (!item) {
            return res.status(404).json({
                message: 'Item not found with the provided itemID'
            })
        }

        // check if item is locked
        if (item.isLocked) {
            return res.status(403).json({
                message: 'Cannot edit item while it is locked'
            })
        }

        // find the product that contains this item to check permissions
        const product = await ProductModel.findOne({ PBLItems: itemID })
        if (!product) {
            return res.status(404).json({ message: 'Product not found for this item.' })
        }

        // check role - only Product Owners can edit items
        const role = product.userLevels?.get(user.userName)
        if (role !== 'Product Owner') {
            return res.status(403).json({
                message: 'Only Product Owners can edit items',
            })
        }


        // update allowed fields
        if (updatedData.title !== undefined) item.title = updatedData.title
        if (updatedData.description !== undefined) item.description = updatedData.description
        if (updatedData.type !== undefined) item.type = updatedData.type
        if (updatedData.priority !== undefined) item.priority = updatedData.priority
        if (updatedData.status !== undefined) item.status = updatedData.status
        if (updatedData.effort !== undefined) item.effort = updatedData.effort
        if (updatedData.risk !== undefined) item.risk = updatedData.risk
        if (updatedData.teamLabel !== undefined) item.teamLabel = updatedData.teamLabel

        // save the updated item to MongoDB
        await item.save()

        res.status(200).json({
            message: 'Item updated successfully',
            itemID: item._id,
            updatedItem: item
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to edit item', error })
    }
})

export default router