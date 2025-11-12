import {z as zod} from 'zod'
import {AuthLogin, AuthRegister} from "./auth.types";

const emailPattern = zod.email("Email is invalid!").min(5, 'Email must be at least 5 chars').max(200)
const RegisterPasswordPattern = zod.string().min(8, 'Password must be at least 8 chars').max(200)
const LoginPasswordPattern = zod.string().min(1, 'Password is required').max(200)
const RegisterNamePattern = zod.string().trim().transform(v => v === "" ? null : v);

// middleware
export function validateRegister(body: AuthRegister) {
    const pattern = zod.object({ email: emailPattern, password: RegisterPasswordPattern, name: RegisterNamePattern})
    const res = pattern.safeParse(body)
    if (!res.success) {
        const i = res.error.issues[0]
        throw new Error(i.message)
    }
    return res.data
}

export function validateLogin(body: AuthLogin) {
    const pattern = zod.object({ email: emailPattern, password: LoginPasswordPattern })
    const res = pattern.safeParse(body)
    if (!res.success) {
        const i = res.error.issues[0]
        throw new Error(i.message)
    }
    return res.data
}