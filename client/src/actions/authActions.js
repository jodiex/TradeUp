import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


// register
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(res => {
      dispatch(loginUser({
        username: newUser.username,
        password: newUser.password1
      }, history))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save token to local storage
      const { username, token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token in Auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user to decoded user data
      dispatch(setCurrentUser(decoded, username));
      // redirect to homepage on successful login
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// logout
export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}, ""));
  // redirect to login
  window.location.href = "./login";
};

// set logged in user
export const setCurrentUser = (decoded, username) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    username: username
  };
};

// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

