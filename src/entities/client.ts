import { Role } from "./role";
import { AccountInfo } from "./account-info";
import type { User } from "./user";
import { Email } from "./email";
import { Password } from "./password";

export class Client extends AccountInfo {
  static of(user: User): Client {
    if (user instanceof Client) {
      return user;
    }
    throw new TypeError("User is not client!");
  }

  static from(obj: object): Client {
    if (AccountInfo.is(obj)) {
      return new Client(obj.id, obj.name, obj.email, obj.password);
    }
    throw new TypeError("Object is not Admin");
  }

  private readonly _type = Symbol("Client");
  public readonly role = Role.CLIENT;

  protected constructor(
    id: string,
    name: string,
    email: Email,
    password: Password
  ) {
    super(id, name, email, password);
  }
}
