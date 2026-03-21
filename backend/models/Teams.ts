import { InferSchemaType, model, Schema } from 'mongoose'

const TeamsSchema = new Schema({
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // holds acc users
    teamName: String,
})

export type ITeams = InferSchemaType<typeof TeamsSchema>
export const TeamsModel = model<ITeams>('Teams', TeamsSchema)
