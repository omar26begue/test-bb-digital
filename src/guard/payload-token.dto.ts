import { ROL } from '@app/users/domain/users.domain';

export class PayloadTokenDTO {
    public email: string;
    public sub: string;
    public roles: ROL[];
}
