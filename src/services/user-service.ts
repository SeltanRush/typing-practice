import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import { Operation } from "../entities/operation";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import {
  AvailableAdminOperationsByUserRole,
  AvailableModeratorOperationsByUserRole,
  AvailableOperationsByUserRoleFor,
} from "../entities/available-operations";
import { UserByRole } from "../entities/user-by-role";
import { Email } from "../entities/email";
export default class UserService {
  private users: readonly User[] = [];

  private readonly availableModeratorOperationsByUserRole: AvailableModeratorOperationsByUserRole = {
    [Role.ADMIN]: [],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
  };

  private readonly availableAdminOperationsByUserRole: AvailableAdminOperationsByUserRole = {
    [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
  };

  async findUserByEmail(email: Email): Promise<User | undefined> {
    const users = await this.getAllUsers();

    return users.find((u) => u.email === email);
  }

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }

  getAvailableOperations<UserRole extends Role, CurrentUserRole extends Role>(
    user: UserByRole<UserRole>,
    currenUser: UserByRole<CurrentUserRole>
  ): AvailableOperationsByUserRoleFor<UserRole>[CurrentUserRole] {
    return this.getAvailableOperationsByUserRoleFor(currenUser.role, user.role);
  }

  getAvailableOperationsByUserRoleFor<R extends Role, UserRole extends Role>(
    role: R,
    userRole: UserRole
  ): AvailableOperationsByUserRoleFor<UserRole>[R] {
    const availableOperationsByUserRoleFor: AvailableOperationsByUserRoleFor<UserRole> = {
      [Role.ADMIN]: this.getAvailableAdminOperationsByUpdatedUserRole(userRole),
      [Role.MODERATOR]: this.getAvailableModeratorOperationsByUpdatedUserRole(
        userRole
      ),
      [Role.CLIENT]: [],
    };
    return availableOperationsByUserRoleFor[role];
  }

  getAvailableModeratorOperationsByUpdatedUserRole<R extends Role>(
    userRole: R
  ): AvailableModeratorOperationsByUserRole[R] {
    return this.availableModeratorOperationsByUserRole[userRole];
  }

  getAvailableAdminOperationsByUpdatedUserRole<R extends Role>(
    userRole: R
  ): AvailableAdminOperationsByUserRole[R] {
    return this.availableAdminOperationsByUserRole[userRole];
  }
}
