export class Password extends String {
  private readonly _type = Symbol("password");

  private constructor(value: string) {
    super(value);
  }

  static is(x: unknown) {
    return x instanceof Password;
  }

  static from(x: unknown) {
    if (typeof x === "string" && this.isValid(x)) {
      return new Password(x);
    }

    throw new Error("X isn't password");
  }

  static equals(a: Password, b: Password) {
    return a.toString() === b.toString();
  }

  protected static isValid(x: string) {
    return x.length > 1;
  }
}
