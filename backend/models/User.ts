import { InferSchemaType, model, Schema } from 'mongoose'

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String,
    products: [String],
})

export type User = InferSchemaType<typeof UserSchema>
export const UserModel = model<User>('User', UserSchema)
