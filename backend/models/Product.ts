import { InferSchemaType, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // now holds acc users

    // Key = user NAME, Value = role ("Developer" or "ProductOwner")
    // Must be object because of a Record user type userLevels
    userLevels: {
        type: Map,
        of: String,
        default: {},
    },

    // See assignedSprints type in shared/types.ts
    // Key: userName
    // Value: Sprint ID
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
