import {
  GETALLUSER_API_FETCH_ERROR,
  GETALLUSER_API_FETCH_INITIATED,
  GETALLUSER_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const GetAllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLUSER_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case GETALLUSER_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case GETALLUSER_API_FETCH_ERROR:
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
