import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOADING } from "./types";

// EXTERNAL IMPORTS
import { instance } from "../api/config";
import { 
    hashString
  } from 'react-hash-string';

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

          // Generating hash value
          let hashedUsername = hashString(response.data.user.username);
          let hashedAdminCheck = hashString(`"${response.data.user.is_admin}"`);
          let hashedUserID = hashString(`"${response.data.user.id}"`);

          // Setting to localStorage
          localStorage.setItem("username", hashedUsername);
          localStorage.setItem("isAdmin", hashedAdminCheck);
          localStorage.setItem("userID", hashedUserID);

          // Dispatching
          dispatch({ type: LOGIN_SUCCESS });
        } else dispatch({ type: LOGIN_FAILURE, payload: response.data.error });
      })
      .catch((error) => dispatch({ type: LOGIN_FAILURE, payload: error }));
  };
};
// CryptoJS.AES.encrypt("1", securityEncryptionKey).toString();
