import {Schema, model} from 'mongoose';

export interface Task {
    _id: string
    title: string
    isDone: boolean
    createdAt: Date
    updatedAt:  Date
}

const TaskSchema = new Schema<Task>({
    title: { type: String, required: true, trim: true, maxLength: 100},
    isDone: {type: Boolean, default: false },
}, {timestamps: true})

export const TaskModel = model<Task>('Task', TaskSchema);