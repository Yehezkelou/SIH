import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

// definition des roles autorises (@Roles('SUPER_ADMIN', 'ADMIN'))
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
