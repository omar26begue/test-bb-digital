import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UsersRequestDomain } from '@app/users/domain/users-request.domain';
import { ROL } from '@app/users/domain/users.domain';
import { AuthRequestModel } from '@app/auth/adapter/controller/model/auth-request.model';

export class UsersRequestModel extends AuthRequestModel {
    @IsEnum(ROL)
    @ApiProperty({ enum: ROL, required: true, example: ROL.USER_ROL, default: ROL.USER_ROL })
    public rol: ROL;

    @IsString()
    @ApiProperty({ type: String, required: true, example: 'John Gonzalez' })
    public name: string;

    public toDomain(): UsersRequestDomain {
        const domain: UsersRequestDomain = new UsersRequestDomain();
        domain.email = this.email;
        domain.password = this.password;
        domain.name = this.name;
        domain.rol = this.rol;

        return domain;
    }
}
