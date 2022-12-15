import { BaseRepositories } from './base';

export class UsersRepositories extends BaseRepositories {

    constructor() {
        super();
    }

    async findByGoogleId(google_id: string) {
        return await this.getPrismaInstance().users.findFirst({
            where: { google_id: google_id }
        });
    }

    async findById(id: any) {
        return await this.getPrismaInstance().users.findUnique({
            where: { id: id }
        });
    }

    async create(profile: any) {
        return await this.getPrismaInstance().users.create({
            data: {
                username: profile.emails?.[0].value.split('@')[0],
                hashed_password: 'xxxxx',
                salt: 'xxxxx',
                name: profile.displayName,
                email: profile.emails?.[0].value,
                google_id: profile.id,
                avatar: profile.photos?.[0].value
            },
        });
    }
}