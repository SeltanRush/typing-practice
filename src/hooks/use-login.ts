import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import { Email } from "../entities/email";
import { Password } from "../entities/password";

type Credentials = {
  email: Email;
  password: Password;
};

export default function useLogin() {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  const login = (credentials: Credentials) => {
    loginService
      .login(credentials.email, credentials.password)
      .then((user: User) =>
        dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
      )
      .then(() => navigate("/dashboard"))
      .catch((e) => alert(e.message));
  };

  return { user: state.user, login };
}
