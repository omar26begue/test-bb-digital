import { SalesModule } from '@app/sales';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { AuthModule } from '@app/auth';
import { UsersModule } from '@app/users';
import { ProductsModule } from '@app/products';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersJsonAdapter } from '@app/users/adapter/jdbc/users-json.adapter';

@Module({
    imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true }), AuthModule, UsersModule, ProductsModule, SalesModule],
    controllers: [],
    providers: [{ provide: UsersRepository, useClass: UsersJsonAdapter }],
})
export class AppModule {}
