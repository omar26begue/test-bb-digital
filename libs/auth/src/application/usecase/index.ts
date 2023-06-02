import { LoginCommand } from '@app/auth/application/port/in/login-command';
import { LoginUsecase } from '@app/auth/application/usecase/login.usecase';

export const UsesCases = [{ provide: LoginCommand, useClass: LoginUsecase }];
