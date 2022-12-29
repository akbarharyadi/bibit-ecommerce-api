import ISubmission from '../model/interface/submission';
import SubmissionModel from '../model/submission_model';

export default class SubmissionRepositories {

    async finById(id: string) {
        return await SubmissionModel.findById(id).exec();
    }
    async update(id: string, submission: ISubmission) {
        return await SubmissionModel.findByIdAndUpdate(id, submission)
    }
    async delete(id: string) {
        return await SubmissionModel.findByIdAndDelete(id)
    }
    async create(submission: ISubmission) {
        return await SubmissionModel.create(submission)
    }
}