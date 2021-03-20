import { Role } from "./role";
import { AccountInfo } from "./account-info";
import type { User } from "./user";
import { Email } from "./email";
import { Password } from "./password";

export class Admin extends AccountInfo {
  static of(user: User): Admin {
    if (user instanceof Admin) {
      return user;
    }
    throw new TypeError("User is not admin!");
  }

  static from(obj: object): Admin {
    if (AccountInfo.is(obj)) {
      return new Admin(obj.id, obj.name, obj.email, obj.password);
    }
    throw new TypeError("Object is not Admin");
  }

  private readonly _type = Symbol("Admin");
  public readonly role = Role.ADMIN;

  protected constructor(
    id: string,
    name: string,
    email: Email,
    password: Password
  ) {
    super(id, name, email, password);
  }
}
