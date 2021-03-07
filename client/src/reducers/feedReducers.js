import {
  SET_POSTS,
  SET_LIKES
} from "../actions/types";


const initialState = {
  posts: [],
  likes: []
};


export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case SET_LIKES:
      return {
        ...state,
        likes: action.likes
      };
    default:
      return state;
  }
}

