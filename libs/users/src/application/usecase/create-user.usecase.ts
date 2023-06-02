import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '@app/users/application/port/in/create-user-command';
import { UsersRequestDomain } from '@app/users/domain/users-request.domain';
import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersDomain } from '@app/users/domain/users.domain';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserUsecase implements CreateUserCommand {
    public constructor(private readonly usersRepository: UsersRepository) {}

    async execute(request: UsersRequestDomain): Promise<UsersDomain> {
        const user: UsersDomain = await this.usersRepository.findByEmail(request.email);

        if (user) {
            throw new BadRequestException('El usuario ya esta registrado');
        }

        const userDomain: UsersDomain = new UsersDomain();
        userDomain.id = uuidv4();
        userDomain.rol = request.rol;
        userDomain.name = request.name;
        userDomain.email = request.email;
        userDomain.encryptPassword(request.password);
        userDomain.active = false;
        userDomain.created_at = new Date();

        await this.usersRepository.create(userDomain);

        return userDomain;
    }
}
