import { Email } from "./email";
import { Password } from "./password";

export class AccountInfo {
  protected static is(obj: any): obj is AccountInfo {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      Email.is(obj.email) &&
      Password.is(obj.password)
    );
  }

  protected constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly password: Password
  ) {}
}
