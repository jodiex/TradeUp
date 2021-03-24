import {
  SET_POSTS,
  SET_LIKES
} from "../actions/types";


const initialState = {
  posts: [],
  likes: [],
  communities: []
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
    case SET_COMMUNITIES:
      return {
        ...state,
        communities: action.communities
      };
    default:
      return state;
  }
}

