import { UsersControllerAdapter } from '@app/users/adapter/controller/users-controller.adapter';
import { Repositories } from '@app/users/adapter/jdbc';
import { UsesCases } from '@app/users/application/usecase';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UsersControllerAdapter],
    providers: [...UsesCases, ...Repositories],
})
export class UsersModule {}
