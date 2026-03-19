import { InferSchemaType, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productUsers: [String],

    // Key = user NAME, Value = role ("Developer" or "ProductOwner")
    userLevels: {
        type: Object,
        default: {},
    },

    // array of sprint IDs
    assignedSprints: [String],

    sprintComplete: Number,
    sprintLeft: Number,
    estimatedTime: Number, // everytime you add an item, it will change this #
    numberSprints: Number,
    daysRemSprint: Number,
    daysRemProduct: Number,

    //PBL VARS
    PBLItems: Array,
    SBLItems: Array,
})

export type IProduct = InferSchemaType<typeof ProductSchema>
export const ProductModel = model<IProduct>('Product', ProductSchema)
