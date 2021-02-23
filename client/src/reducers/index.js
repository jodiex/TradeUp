import { combineReducers } from "redux";
import auth from "./authReducers";
import errors from "./errorReducers";


export default combineReducers({
  auth,
  errors
});
