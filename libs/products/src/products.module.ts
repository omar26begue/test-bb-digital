import { Repositories } from '@app/products/adapter/jdbc';
import { Module } from '@nestjs/common';
import { ProductsControllerAdapter } from '@app/products/adapter/controller/products-controller.adapter';
import { UsesCases } from '@app/products/application/usecase';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersJsonAdapter } from '@app/users/adapter/jdbc/users-json.adapter';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions, JwtModuleOptions, JwtService } from '@nestjs/jwt';

@Module({
    controllers: [ProductsControllerAdapter],
    providers: [...UsesCases, ...Repositories, { provide: UsersRepository, useClass: UsersJsonAdapter }, JwtService],
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
export class ProductsModule {}
