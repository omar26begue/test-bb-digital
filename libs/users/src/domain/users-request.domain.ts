import { ROL } from '@app/users/domain/users.domain';

export class UsersRequestDomain {
    public rol: ROL;
    public email: string;
    public password: string;
    public name: string;
}
