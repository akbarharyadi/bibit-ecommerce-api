import { mongoose } from "../service/mongose";
import ISubmission from './interface/submission';
import submissionSchema from './schema/submission_schema';

const SubmissionModel = mongoose.model<ISubmission>('Submission', submissionSchema);

export default SubmissionModel