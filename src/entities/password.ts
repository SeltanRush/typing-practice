import * as t from "runtypes";

export const Password = t.String.withBrand("password").withConstraint(
  (maybePassword) => maybePassword.length > 1
);

export type Password = t.Static<typeof Password>;
