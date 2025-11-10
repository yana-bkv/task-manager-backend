import {User, UserModel} from '../user/user.model';
import {AuthLogin, AuthRegister} from "./auth.types";
import bcrypt from 'bcrypt';

interface AuthServiceInterface {
    login: (body: AuthLogin) => Promise<User>
    register: (body: AuthRegister) => Promise<User>
}

export class AuthService implements AuthServiceInterface {
    async login(body: AuthLogin): Promise<User> {
        const foundUser = await UserModel.findOne({ email: body.email }).lean();

        if (!foundUser) {
            throw new Error('User does not exist')
        }

        const isCorrectPass = await bcrypt.compare(body.password, foundUser.password)
        if (!isCorrectPass) {
            throw new Error('Password is incorrect')
        }

        return foundUser
    }

    async register(body: AuthRegister): Promise<User> {
        const foundUser = await UserModel.findOne({ email: body.email }).lean();

        if (foundUser) {
            throw new Error('User already exists. Please login ')
        }

        const encryptedPass = await bcrypt.hash(body.password, Number(process.env.SECRET_SALT))
        const newUser = await UserModel.create({email: body.email, password: encryptedPass, name: body?.name})

        return newUser.toObject();
    }
}