import { Schema } from 'mongoose';
import IUser from '../interface/IUser';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  familyName: { type: String },
  givenName: { type: String },
  email: { type: String, required: true, unique: true },
  photos: { type: String },
});

export default userSchema.plugin(mongooseUniqueValidator)