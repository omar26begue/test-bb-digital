import * as bcrypt from 'bcrypt';

export enum ROL {
    ADMIN_ROL = 'ADMIN_ROL',
    EDIT_ROL = 'EDIT_ROL',
    USER_ROL = 'USER_ROL',
}
export class UsersDomain {
    public id: string;
    public rol: ROL;
    public name: string;
    public email: string;
    public password: string;
    public active: boolean;
    public created_at: Date;
    public updated_at: Date;

    public encryptPassword(password: string): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
