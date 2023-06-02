import { ROL } from '@app/users/domain/users.domain';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const CanAccessRoles = (...roles: ROL[]) => SetMetadata(ROLES_KEY, roles);
