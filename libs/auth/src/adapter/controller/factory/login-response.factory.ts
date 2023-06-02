import { AuthLoginResponseDomain } from '@app/auth/domain/auth-login-response.domain';
import { AuthResponseModel } from '@app/auth/adapter/controller/model/auth-response.model';

export function toResponseLogin(payload: AuthLoginResponseDomain): AuthResponseModel {
    const response: AuthResponseModel = new AuthResponseModel();
    response.id = payload.id;
    response.token = payload.token;

    return response;
}
