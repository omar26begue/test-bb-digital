import { UsersRequestDomain } from '@app/users/domain/users-request.domain';
import { UsersDomain } from '@app/users/domain/users.domain';

export abstract class CreateUserCommand {
    abstract execute(request: UsersRequestDomain): Promise<UsersDomain>;
}
