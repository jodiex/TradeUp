import axios from "axios";
import {
  GET_ERRORS,
  SET_POSTS,
  SET_LIKES,
  SET_COMMUNITIES
} from "./types";


// update posts in state from db
export const updateProfilePosts = (username) => dispatch => {
  if (username) {
    axios
      .get("/api/posts/user/" + username)
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

// update posts in state to trending posts
export const updateTrendingPosts = () => dispatch => {
  axios
    .get("/api/posts/trending")
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


// update posts in state to feed posts
export const updateFeedPosts = (username) => dispatch => {
  if (username) {
    axios
      .get("/api/follows/" + username + "/following")
      .then(res => {
        var following = res.data.following ? res.data.following : [];
        following = following.map(follow => follow.username);
        return axios.get("/api/posts/feed", { params: { following: following }});
      })
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

// update communities in state
export const updateCommunities = (username) => dispatch => {
  if (username) {
    axios
      .get("/api/communities/" + username + "/joined")
      .then(res => {
        const joined = res.data.joined ? res.data.joined : [];
        dispatch(setCommunities(joined))
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      });
  } else {
    dispatch(setCommunities([]))
  }
};


// set communities
export const setCommunities = (communities) => {
  return {
    type: SET_COMMUNITIES,
    communities: communities
  };
};
