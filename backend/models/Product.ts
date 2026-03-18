import { InferSchemaType, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    productName: String,
    productDescription: String,
    productUsers: Array<String>,

    // Key = user ID, Value = role ("Developer" or "ProductOwner")
    userLevels: {
        type: Map<String, String>,
        of: String,
    },

    // Key = user ID, Value = sprint identifier
    assignedSprints: {
        type: Map<String, String>,
        of: String,
    },

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

export type Product = InferSchemaType<typeof ProductSchema>
export const ProductModel = model<Product>('Product', ProductSchema)
