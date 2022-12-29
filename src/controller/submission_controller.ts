
import SubmissionRepositories from './../repositories/submission_repositories';
import ISubmission from './../model/interface/submission';
import UserModel from '../model/user_model';
import { sendMail } from '../service/mailer';
export default class SubmissionController {
    repo: SubmissionRepositories

    constructor() {
        this.repo = new SubmissionRepositories()
    }

    async create(submission: ISubmission, user: Express.User | undefined) {
        if (submission === undefined)
            throw new TypeError("Data Harus diisi!");
        let _user = new UserModel(user)
        submission.status = 1
        submission.user = _user._id
        let _submission = await this.repo.create(submission)
        sendMail(_user.email, 'Pengajuan Bibit', 'Terimakasih sudah melakukan pengajuan bibit. silahkan tunggu kabar dari admin selanjutnya.')
        return _submission;
    }
}