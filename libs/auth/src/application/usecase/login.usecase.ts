import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginCommand } from '@app/auth/application/port/in/login-command';
import { AuthLoginRequestDomain } from '@app/auth/domain/auth-login-request.domain';
import { AuthLoginResponseDomain } from '@app/auth/domain/auth-login-response.domain';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersDomain } from '@app/users/domain/users.domain';
import { JwtService } from '@nestjs/jwt';
import { PayloadTokenDTO } from '../../../../../src/guard/payload-token.dto';

@Injectable()
export class LoginUsecase implements LoginCommand {
    public constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {}

    async execute(payload: AuthLoginRequestDomain): Promise<AuthLoginResponseDomain> {
        const user: UsersDomain = await this.usersRepository.findByEmail(payload.email);

        if (user === null) {
            throw new NotFoundException('Usuario no encontrado');
        }
        if (user.active === false) {
            throw new BadRequestException('El usuario no esta activo');
        }

        if ((await user.comparePassword(payload.password)) === false) {
            throw new BadRequestException('Contrasena incorrecta');
        }

        console.log(user);

        return { id: user.id, token: this.jwtService.sign({ sub: user.id, email: user.email, roles: [...user.rol] } as PayloadTokenDTO) } as AuthLoginResponseDomain;
    }
}
