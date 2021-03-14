import { Admin } from "../entities/admin";
import { Moderator } from "../entities/moderator";
import { AllowedToLoginUser } from "../entities/user";
import or from "../utils/or";
import UserService from "./user-service";

export default class LoginService {
  constructor(private userService: UserService) {}

  public async login(
    email: string,
    password: string
  ): Promise<AllowedToLoginUser> {
    const user = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      try {
        const adminOrClient = or(Admin, Moderator);
        return adminOrClient(user);
      } catch (e) {
        throw new Error(`Forbidden`);
      }
    }

    throw new Error(`Incorrect credentials`);
  }
}
