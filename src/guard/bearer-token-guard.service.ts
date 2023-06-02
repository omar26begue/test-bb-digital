import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadTokenDTO } from './payload-token.dto';

@Injectable()
export class BearerTokenGuard implements CanActivate {
    public constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    public async canActivate(context: ExecutionContext): never | Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const authorization: string = req.headers['authorization'] as string;

        if (!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');
        if (!bearer || bearer.length != 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];
        try {
            const payload: PayloadTokenDTO = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('jwt.secret') });

            req['user'] = payload;
        } catch (e) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
