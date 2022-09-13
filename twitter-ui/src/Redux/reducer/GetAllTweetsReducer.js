import {
  GETALLTWEET_API_FETCH_ERROR,
  GETALLTWEET_API_FETCH_INITIATED,
  GETALLTWEET_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const GetAllTweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLTWEET_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case GETALLTWEET_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case GETALLTWEET_API_FETCH_ERROR:
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
