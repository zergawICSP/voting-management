// COMPONENT IMPORTS
import { toast } from "react-toastify";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_LOADING } from "../action/types";

const initialState = { isLoginLoading: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, isLoginLoading: true };
    case LOGIN_SUCCESS:
      toast.success("Logged in Successfully !", { position: "bottom-center" });
      return { ...state, isLoginLoading: false, isLoggedIn: true };
    case LOGIN_FAILURE:
      toast.error("Error while trying to log in: " + action.payload, { position: "bottom-center" });
      return { ...state, isLoginLoading: false };
    default:
      return state;
  }
};

export default authReducer;
