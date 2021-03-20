export class Email extends String {
  private readonly _type = Symbol("email");

  private constructor(email: unknown) {
    super(email);
  }

  static is(x: unknown): x is Email {
    return x instanceof Email;
  }

  static from(x: unknown) {
    if (typeof x === "string" && x.includes("@")) {
      return new Email(x);
    }

    throw new Error("X isn't email");
  }
}
