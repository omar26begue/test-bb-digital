import { ActiveUserCommand } from '@app/users/application/port/in/active-user-command';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersActiveParamModel } from '@app/users/adapter/controller/model/users-active-param.model';
import { UsersDomain } from '@app/users/domain/users.domain';
import { UsersRepository } from '@app/users/application/port/out/users.repository';

@Injectable()
export class ActiveUserUsecase implements ActiveUserCommand {
    public constructor(private readonly usersRepository: UsersRepository) {}

    async execute(payload: UsersActiveParamModel): Promise<UsersDomain> {
        const user: UsersDomain = await this.usersRepository.findByEmail(payload.email);

        if (user === null) {
            throw new NotFoundException('Usuario no encontrado');
        }

        if (user.active === true) {
            throw new BadRequestException('Usuario activado');
        }

        return await this.usersRepository.active(user.id);
    }
}
