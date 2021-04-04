import { Email } from "../entities/email";
import { Password } from "../entities/password";
import { User } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (user && Password.equals(user.password, password)) {
      return user;
    }

    throw new Error(`Incorrect credentials`);
  }
}
