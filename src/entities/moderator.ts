import { Role } from "./role";
import { AccountInfo } from "./account-info";
import type { User } from "./user";
import { Email } from "./email";
import { Password } from "./password";

export class Moderator extends AccountInfo {
  static is(user: User): user is Moderator {
    return user instanceof Moderator;
  }

  static of(user: User): Moderator {
    if (this.is(user)) {
      return user;
    }
    throw new TypeError("User is not moderator!");
  }

  static from(obj: object): Moderator {
    if (AccountInfo.is(obj)) {
      return new Moderator(obj.id, obj.name, obj.email, obj.password);
    }
    throw new TypeError("Object is not Admin");
  }

  private readonly _type = Symbol("Moderator");
  public readonly role = Role.MODERATOR;

  protected constructor(
    id: string,
    name: string,
    email: Email,
    password: Password
  ) {
    super(id, name, email, password);
  }
}
