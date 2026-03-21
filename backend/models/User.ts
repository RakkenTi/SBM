import { InferSchemaType, model, Schema } from 'mongoose'
// User IDs are based on the objectID of the User. 
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true }, // also added unique index
    password: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // this now holds acc products
})

export type IUser = InferSchemaType<typeof UserSchema>
export const UserModel = model<IUser>('User', UserSchema)
