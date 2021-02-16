// EXTERNAL IMPORTS
import { combineReducers } from "redux";
import attendantReducer from "./attendantReducer";
import AuthReducer from "./authReducer";
import voteReducer from "./voteReducer";

export default combineReducers({
  auth: AuthReducer,
  attendant: attendantReducer,
  vote: voteReducer,
});
