import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/types";


const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  username: '',
  loading: false
};


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.username !== null) {
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          username: action.username
        };
      }
      // don't update username if username is null
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
