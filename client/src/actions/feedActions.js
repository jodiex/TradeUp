import axios from "axios";
import {
  GET_ERRORS,
  SET_POSTS,
  SET_LIKES
} from "./types";


// update posts in state from db
export const updateProfilePosts = (username) => dispatch => {
  if (username) {
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
  } else {
    dispatch(setPosts([]));
  }
};

// set posts
export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts: posts
  };
};


// update likes in state from db
export const updateLikes = (username) => dispatch => {
  if (username) {
    axios
      .get("/api/likes/" + username)
      .then(res => {
        dispatch(setLikes(
          res.data.likes
        ))
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
  } else {
    dispatch(setLikes([]))
  }
};

// set likes
export const setLikes = (likes) => {
  return {
    type: SET_LIKES,
    likes: likes
  };
};

// update posts in state to liked posts from db
export const updateLikedPosts = (username) => dispatch => {
  if (username) {
    axios
      .get("/api/likes/" + username)
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
  } else {
    dispatch(setPosts([]))
  }
};
