import { Email } from "../entities/email";
import { Password } from "../entities/password";
import { User } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private userService: UserService) {}

  public async login(
    maybeEmail: unknown,
    maybePassword: unknown
  ): Promise<User> {
    const email = Email.from(maybeEmail);
    const password = Password.from(maybePassword);

    const user = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    throw new Error(`Incorrect credentials`);
  }
}
