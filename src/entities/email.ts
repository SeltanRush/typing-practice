export class Email extends String {
  private readonly _type = Symbol("email");

  private constructor(value: string) {
    super(value);
  }

  static is(x: unknown) {
    return x instanceof Email;
  }

  static from(x: unknown) {
    if (typeof x === "string" && this.isValid(x)) {
      return new Email(x);
    }

    throw new Error("X isn't email");
  }

  protected static isValid(x: string) {
    return x.includes("@");
  }
}
