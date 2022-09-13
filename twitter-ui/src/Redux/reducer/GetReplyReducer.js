import {
  GETREPLY_API_FETCH_ERROR,
  GETREPLY_API_FETCH_INITIATED,
  GETREPLY_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const GetReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETREPLY_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case GETREPLY_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case GETREPLY_API_FETCH_ERROR:
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
