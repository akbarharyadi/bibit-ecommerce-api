import IUser from "./interface/user";
import userSchema from "./schema/user_schema";
import { mongoose } from "../service/mongose";

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel