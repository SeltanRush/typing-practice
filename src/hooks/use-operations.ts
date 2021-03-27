import { useContext } from "react";

import Services from "../services";
import { UserByRole } from "../entities/user-by-role";
import { Role } from "../entities/role";

export default function useOperations<
  UserRole extends Role,
  CurrentUserRole extends Role
>(user: UserByRole<UserRole>, currentUser: UserByRole<CurrentUserRole>) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
