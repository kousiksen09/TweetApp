import {POST_API_FETCH_INITIATED, POST_API_FETCH_SUCCESS, POST_API_FETCH_ERROR} from '../Type/ApiFetchType';

// TweetPost

const initialState = {
    status: '',
    APIData: [],
  };
  export const TweetPostReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_API_FETCH_INITIATED:
        return {
          ...state,
          status: 'loading',
          APIData: [],
        };
      case POST_API_FETCH_SUCCESS:
        state.APIData.push(action.data);
        return {
          status: 'success',
          APIData: state.APIData,
        };
      case POST_API_FETCH_ERROR:
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
      
