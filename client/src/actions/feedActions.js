import axios from "axios";
import {
  GET_ERRORS,
  SET_POSTS
} from "./types";


// get posts from db
export const getPosts = (username) => dispatch => {
  axios
    .get("/api/posts/" + username)
    .then(res => {
      dispatch(setPosts(
        res.data.posts
      ))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

// set posts
export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts: posts
  };
};
