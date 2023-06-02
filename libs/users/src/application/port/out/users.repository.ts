import { UsersDomain } from '@app/users/domain/users.domain';

export abstract class UsersRepository {
    abstract findByEmail(email: string): Promise<UsersDomain>;
    abstract getAll(): Promise<UsersDomain[]>;
    abstract create(user: UsersDomain): Promise<void>;
    abstract active(id: string): Promise<UsersDomain>;
}
