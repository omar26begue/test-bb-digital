import { UsersDomain } from '@app/users/domain/users.domain';
import { UsersResponseModel } from '@app/users/adapter/controller/model/users-response.model';

export function toResponseUsers(usersDomain: UsersDomain): UsersResponseModel {
    const user: UsersResponseModel = new UsersResponseModel();
    user.id = usersDomain.id;
    user.email = usersDomain.email;
    user.name = usersDomain.name;

    return user;
}
