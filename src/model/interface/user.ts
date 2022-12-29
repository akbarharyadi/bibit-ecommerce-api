import { Types } from "mongoose";

export default interface IUser {
    _id?: Types.ObjectId,  
    googleId: string;
    displayName: string;
    familyName: string;
    givenName: string;
    email: string;
    photos: string;
}