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
    team: [String], // Team IDs!
    tasks: [String], // Only store task references.
})
export type ISprint = InferSchemaType<typeof SprintSchema>
export const SprintModel = model<ISprint>('Sprint', SprintSchema)
