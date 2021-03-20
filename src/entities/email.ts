export class Email extends String {
  private readonly _type = Symbol("email");

  static is(x: unknown): x is Email {
    return typeof x === "string" && x.includes("@");
  }

  static from(x: unknown) {
    if (this.is(x)) {
      return x;
    }

    throw new Error("X isn't email");
  }
}
