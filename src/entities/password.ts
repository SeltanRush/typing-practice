export class Password extends String {
  private readonly _type = Symbol("password");

  private constructor(password: string) {
    super(password);
  }

  static is(x: unknown): x is Password {
    return x instanceof Password;
  }

  static from(x: unknown) {
    if (typeof x === "string" && x.length > 6) {
      return new Password(x);
    }

    throw new Error("X isn't password");
  }
}
