import { useContext } from "react";

import Services from "../services";
import { Role } from "../entities/role";
import { UserByRole } from "../entities/role-to-user";

export default function useOperations<
  UserRole extends Role,
  CurrentUserRole extends Role
>(user: UserByRole[UserRole], currentUser: UserByRole[CurrentUserRole]) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
