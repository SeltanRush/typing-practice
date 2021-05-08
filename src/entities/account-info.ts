import * as t from "runtypes";
import { Email } from "./email";

export const AccountInfo = t.Record({
  id: t.String,
  name: t.String,
  email: Email,
  password: t.String,
});
