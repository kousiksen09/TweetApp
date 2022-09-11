import {
  TWEETREPLY_API_INITIATED,
  TWEETREPLY_API_SUCCESS,
  TWEETREPLY_API_ERROR,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};
export const TweetReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWEETREPLY_API_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case TWEETREPLY_API_SUCCESS:
      state.APIData.push(action.data);
      return {
        status: 'success',
        APIData: state.APIData,
      };
    case TWEETREPLY_API_ERROR:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'Error',
        APIData: action.data,
      };
    default:
      return state;
  }
};
