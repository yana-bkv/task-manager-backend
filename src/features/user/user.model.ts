import {Schema, model} from 'mongoose';

export interface User {
    _id: string
    name?: string
    password: string
    email: string
    createdAt: Date
    updatedAt:  Date
}

const UserSchema = new Schema<User>({
    name: { type: String, required: true, trim: true, minLength: 1, maxLength: 100},
    email: { type: String, required: true, trim: true, minLength: 5, maxLength: 100},
    password: { type: String, required: true, trim: true, minLength: 8, maxLength: 100},
}, {timestamps: true})

export const UserModel = model<User>('User', UserSchema);