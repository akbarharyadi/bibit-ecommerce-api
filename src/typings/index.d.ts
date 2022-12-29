
import IUser from '../model/interface/user';
declare global {
    namespace Express {
        interface User extends IUser {}
    }
}