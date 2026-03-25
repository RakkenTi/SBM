import { InferSchemaType, model, Schema } from 'mongoose'

const SprintSchema = new Schema({
    goal: String,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ['Inactive', 'Active', 'Completed'],
        default: 'Inactive',
    },
    cost: Number,
    snapshots: [
        {
            date: Date,
            budget: Number,
        },
    ],
    team: { type: Schema.Types.ObjectId, ref: 'Teams' }, // holds acc teams
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Item' }] // holds acc items
})
export type ISprint = InferSchemaType<typeof SprintSchema>
export const SprintModel = model<ISprint>('Sprint', SprintSchema)
