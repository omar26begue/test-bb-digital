import { UsersRepository } from '@app/users/application/port/out/users.repository';
import { UsersJsonAdapter } from '@app/users/adapter/jdbc/users-json.adapter';

export const Repositories = [{ provide: UsersRepository, useClass: UsersJsonAdapter }];
