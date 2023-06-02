import { UsersActiveParamModel } from '@app/users/adapter/controller/model/users-active-param.model';
import { UsersDomain } from '@app/users/domain/users.domain';

export abstract class ActiveUserCommand {
    abstract execute(payload: UsersActiveParamModel): Promise<UsersDomain>;
}
