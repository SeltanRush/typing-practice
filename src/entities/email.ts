import * as t from "runtypes";

export const Email = t.String.withBrand("Email").withConstraint((maybeEmail) =>
  maybeEmail.includes("@")
);

export type Email = t.Static<typeof Email>;
