import { Module } from '@nestjs/common';
import { AuthControllerAdapter } from '@app/auth/adapter/controller/auth-controller.adapter';
import { UsesCases } from '@app/auth/application/usecase';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersJsonAdapter } from '@app/users/adapter/jdbc/users-json.adapter';
import { JwtModule, JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [AuthControllerAdapter],
    providers: [...UsesCases, { provide: UsersRepository, useClass: UsersJsonAdapter }],
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) =>
                ({
                    secret: configService.get<string>('jwt.secret'),
                    signOptions: { expiresIn: configService.get<string>('jwt.expireIn') },
                } as JwtModuleOptions),
            inject: [ConfigService],
        } as JwtModuleAsyncOptions),
    ],
})
export class AuthModule {}
