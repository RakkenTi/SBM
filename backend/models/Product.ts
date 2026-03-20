import { InferSchemaType, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productUsers: [String], // Holds userID's, only holds references.

    // Key = user NAME, Value = role ("Developer" or "ProductOwner")
    // Must be object because of a Record user type userLevels
    userLevels: {
        type: Object,
        default: {},
    },

    // See assignedSprints type in shared/types.ts
    // Key: userName
    // Value: Sprint ID
    assignedSprints: {
        type: Object,
        default: {},
    },

    sprintComplete: Number,
    sprintLeft: Number,
    estimatedTime: Number, // everytime you add an item, it will change this #
    numberSprints: Number,
    daysRemSprint: Number,
    daysRemProduct: Number,
    totalBudget: Number,
    teams: {
        type: Object,
        default: {},
    },

    //PBL VARS
    PBLItems: Array,
    Sprints: Array,
})

export type IProduct = InferSchemaType<typeof ProductSchema>
export const ProductModel = model<IProduct>('Product', ProductSchema)
