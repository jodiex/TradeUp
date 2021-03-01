import { combineReducers } from "redux";
import auth from "./authReducers";
import feed from "./feedReducers";
import errors from "./errorReducers";


export default combineReducers({
  auth,
  feed,
  errors
});
