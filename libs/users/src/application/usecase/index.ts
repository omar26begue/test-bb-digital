import { CreateUserCommand } from '@app/users/application/port/in/create-user-command';
import { CreateUserUsecase } from '@app/users/application/usecase/create-user.usecase';
import { ActiveUserCommand } from '@app/users/application/port/in/active-user-command';
import { ActiveUserUsecase } from '@app/users/application/usecase/active-user.usecase';

export const UsesCases = [
    { provide: CreateUserCommand, useClass: CreateUserUsecase },
    { provide: ActiveUserCommand, useClass: ActiveUserUsecase },
];
