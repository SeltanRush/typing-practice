export class Password extends String {
  private readonly _type = Symbol("password");

  static is(x: unknown): x is Password {
    return typeof x === "string" && x.length > 0;
  }

  static from(x: unknown) {
    if (this.is(x)) {
      return x;
    }

    throw new Error("X isn't password");
  }
}
