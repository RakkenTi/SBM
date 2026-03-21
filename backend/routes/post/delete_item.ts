import express from 'express'
import { Types } from 'mongoose'
import { ItemModel } from '../../models/Item'
import { ProductModel } from '../../models/Product'
import { SprintModel } from '../../models/Sprint'

const router = express.Router()

router.post('/delete_item', async (req, res) => {
    try {
        // get item data sent from the frontend
        const { itemID, productId } = req.body

        if (!itemID || !productId) {
            return res.status(400).json({ 
                message: 'Missing required fields: itemID and productId are both required.' 
            })
        }

        if (!Types.ObjectId.isValid(itemID) || !Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ 
                message: 'Invalid itemID or productId format' 
            })
        }

        // check if item exists
        const item = await ItemModel.findById(itemID)

        if (!item) {
            return res.status(404).json({ 
                message: 'Item not found with the provided itemID' 
            })
        }

        // check if product exists
        const product = await ProductModel.findById(productId)

        if (!product) {
            return res.status(404).json({ 
                message: 'Product not found with the provided productId' 
            })
        }

        // check if item is in any sprints
        const sprints = await SprintModel.find({ tasks: itemID })

        // check if item is in an active sprint
        const activeSprint = sprints.find((sprint) => sprint.status === 'Active')

        if (activeSprint) {
            return res.status(400).json({ 
                message: 'Cannot delete item that is in an active sprint',
                sprintID: activeSprint._id,
                sprintName: activeSprint.goal
            })
        }

        console.log(
            'Received request to delete item:',
            'itemID:', itemID,
            'productId:', productId
        ) // for debugging

        // remove item from all sprints it's in
        for (const sprint of sprints) {
            sprint.tasks = sprint.tasks.filter(
                (id) => id.toString() !== itemID
            )
            await sprint.save()
        }

        // remove item from product's PBLItems array
        product.PBLItems = product.PBLItems.filter(
            (id) => id.toString() !== itemID
        )

        // save the updated product
        await product.save()

        // delete the item from database
        await ItemModel.findByIdAndDelete(itemID)

        res.status(200).json({ 
            message: 'Item deleted successfully',
            itemID: item._id
        })
        
    } catch (error) {
        console.error(error) // log for debugging
        res.status(500).json({ message: 'Failed to delete item', error })
    }
})

export default router
