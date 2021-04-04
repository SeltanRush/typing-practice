export class Email extends String {
  private readonly _type = Symbol("email");

  private value: string;

  private constructor(value: string) {
    super(value);
    this.value = value;
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

  static equals(a: Email, b: Email) {
    return a.toString() === b.toString();
  }

  protected static isValid(x: string) {
    return x.includes("@");
  }
}
