import { Schema } from 'mongoose';
import IUser from '../interface/user';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  familyName: { type: String },
  givenName: { type: String },
  email: { type: String, required: true, unique: true },
  photos: { type: String },
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});

export default userSchema.plugin(mongooseUniqueValidator)