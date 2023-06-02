import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthLoginRequestDomain } from '@app/auth/domain/auth-login-request.domain';

export class AuthRequestModel {
    @IsEmail()
    @ApiProperty({ type: String, required: true, example: 'test@gmail.com' })
    public email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @ApiProperty({ type: String, required: true, example: '123456', minLength: 6 })
    public password: string;

    public toDomain(): AuthLoginRequestDomain {
        const domain: AuthLoginRequestDomain = new AuthLoginRequestDomain();
        domain.email = this.email;
        domain.password = this.password;

        return domain;
    }
}
