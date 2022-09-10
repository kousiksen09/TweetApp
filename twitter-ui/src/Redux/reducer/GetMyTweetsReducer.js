import {
  GETMYTWEET_API_FETCH_ERROR,
  GETMYTWEET_API_FETCH_INITIATED,
  GETMYTWEET_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const GetMyTweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETMYTWEET_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case GETMYTWEET_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case GETMYTWEET_API_FETCH_ERROR:
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
