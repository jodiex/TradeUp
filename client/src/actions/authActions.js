import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  CLEAR_ERRORS
} from "./types";


// register
export const registerUser = (newUser) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(res => {
      dispatch(loginUser({
        username: newUser.username,
        password: newUser.password1
      }))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login
export const loginUser = (userData) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token in Auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user to decoded user data
      dispatch(setCurrentUser(decoded));
      // redirect to homepage on successful login
      window.location.href = "/";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// logout
export const logoutUser = (history) => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  // redirect to login
  if (history) {
    history.push("/login");
  }
};

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

