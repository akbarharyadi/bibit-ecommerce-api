import { Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import ISubmission from './../interface/submission';

const submissionSchema = new Schema<ISubmission>({
    quantity: { type: String, required: true },
    identity_number: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    wide: { type: Number, required: true },
    level_y: { type: Number, required: true },
    minute_y: { type: Number, required: true },
    second_y: { type: Number, required: true },
    level_x: { type: Number, required: true },
    minute_x: { type: Number, required: true },
    second_x: { type: Number, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    goods: { type: String, required: true }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

export default submissionSchema.plugin(mongooseUniqueValidator)