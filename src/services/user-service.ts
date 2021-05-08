import { Role } from "../entities/role";
import { User } from "../entities/user";
import { castTo, UserByRole } from "../entities/role-to-user";
import { Email } from "../entities/email";
import type { RoleToUser } from "../entities/role-to-user";
import {
  AvailableOperations,
  AVAILABLE_OPERATIONS,
} from "../entities/available-operations";

export default class UserService {
  private users: readonly User[] = [];

  async findUserByEmail(email: Email): Promise<User | undefined> {
    const users = await this.getAllUsers();

    return users.find((u) => email === u.email);
  }

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(user: RoleToUser[R], newRole: R) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getAvailableOperations<UserRole extends Role, CurrentUserRole extends Role>(
    user: UserByRole[UserRole],
    currentUser: UserByRole[CurrentUserRole]
  ): AvailableOperations[CurrentUserRole][UserRole] {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role];
  }
}
