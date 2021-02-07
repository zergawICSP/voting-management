import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOADING } from "./types";

// EXTERNAL IMPORTS
import { instance } from "../api/config";

export const authLoginFormAction = (values) => {
  return (dispatch) => {
    // Dispatching loading indicator
    dispatch({ type: LOGIN_LOADING });

    const username = values.userLoginUserName;
    const password = values.userLoginPassword;

    // Operation
    instance
      .post("/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("isAdmin", response.data.user.is_admin);

          // Dispatching
          dispatch({ type: LOGIN_SUCCESS });

        }
      })
      .catch((error) => dispatch({type: LOGIN_FAILURE, payload: error.response.data.error}));
  };
};
