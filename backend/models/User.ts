import { InferSchemaType, model, Schema } from 'mongoose'

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    products: [String],
})

export type IUser = InferSchemaType<typeof UserSchema>
export const UserModel = model<IUser>('User', UserSchema)
