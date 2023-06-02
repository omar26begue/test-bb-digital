import { ProductsJsonAdapter } from '@app/products/adapter/jdbc/products-json.adapter';
import { ProductRepository } from '@app/products/application/port/out/product.repository';
import { SalesControllerAdapter } from '@app/sales/adapter/controller/sales-controller.adapter';
import { Repositories } from '@app/sales/adapter/jdbc';
import { UsesCases } from '@app/sales/application/usecase';
import { UsersJsonAdapter } from '@app/users/adapter/jdbc/users-json.adapter';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [SalesControllerAdapter],
    providers: [...UsesCases, ...Repositories, { provide: UsersRepository, useClass: UsersJsonAdapter }, { provide: ProductRepository, useClass: ProductsJsonAdapter }, JwtService],
    exports: [],
})
export class SalesModule {}
