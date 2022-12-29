import { Types } from "mongoose";

export default interface ISubmission {
    user: Types.ObjectId,  
    quantity: string;
    identity_number: string;
    address: string;
    description: string;
    latitude: Number;
    longitude: Number;
    wide: Number;
    level_y: Number;
    minute_y: Number;
    second_y: Number;
    level_x: Number;
    minute_x: Number;
    second_x: Number;
    type: Number;
    status: Number;
    goods: String;
}