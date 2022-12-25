import IUser from "../model/interface/IUser";
import UserModel from "../model/UserModel";

export default class UsersRepositories {

    async finById(id: string) {
        return await UserModel.findById(id).exec();
    }
    async findByGoogleId(googleId: string) {
        return await UserModel.findOne({ googleId: googleId }).exec();
    }
    async finByUserName(userName: string) {
        return await UserModel.findOne({ userName: userName }).exec();
    }
    async update(id: string, user: IUser) {
        return await UserModel.findByIdAndUpdate(id, user)
    }
    async delete(id: string) {
        return await UserModel.findByIdAndDelete(id)
    }
    async create(users: IUser) {
        return await UserModel.create(users)
    }
}