import { InferSchemaType, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // now holds acc users

    // Key = user NAME, Value = role ("Developer" or "ProductOwner")
    userLevels: {
        type: Map,
        of: String,
        default: {},
    },

    // array of sprint IDs
    assignedSprints: {
        type: Map,
        of: Schema.Types.ObjectId, // holds ids
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
        type: Map,
        of: [Schema.Types.ObjectId], // holds ids
        default: {},
    },

    //PBL VARS
    PBLItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }], // holds acc items
    Sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }], //hold acc sprints
})

export type IProduct = InferSchemaType<typeof ProductSchema>
export const ProductModel = model<IProduct>('Product', ProductSchema)
