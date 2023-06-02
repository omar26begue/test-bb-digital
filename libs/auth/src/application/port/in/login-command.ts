import { AuthLoginRequestDomain } from '@app/auth/domain/auth-login-request.domain';
import { AuthLoginResponseDomain } from '@app/auth/domain/auth-login-response.domain';

export abstract class LoginCommand {
    abstract execute(payload: AuthLoginRequestDomain): Promise<AuthLoginResponseDomain>;
}
