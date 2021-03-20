import { Role } from "./role";
import { User } from "./user";

export type UserByRole<R extends Role> = Extract<User, { role: R }>;
