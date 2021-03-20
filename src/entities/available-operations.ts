import { Operation } from "./operation";
import { Role } from "./role";

export type AvailableOperationsByUserRoleFor<UserRole extends Role> = {
  [Role.ADMIN]: AvailableAdminOperationsByUserRole[UserRole];
  [Role.MODERATOR]: AvailableModeratorOperationsByUserRole[UserRole];
  [Role.CLIENT]: [];
};

export type AvailableModeratorOperationsByUserRole = {
  [Role.ADMIN]: [];
  [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR];
  [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT];
};

export type AvailableAdminOperationsByUserRole = {
  [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR];
  [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
  [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR];
};
