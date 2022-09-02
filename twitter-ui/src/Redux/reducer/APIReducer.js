import {
  REGISTER_API_FETCH_ERROR,
  REGISTER_API_FETCH_INITIATED,
  REGISTER_API_FETCH_SUCCESS,
  LOGIN_API_FETCH_INITIATED,
  LOGIN_API_FETCH_SUCCESS,
  LOGIN_API_FETCH_ERROR,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};
export const RegisterAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case REGISTER_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        status: 'success',
        APIData: state.APIData,
      };
    case REGISTER_API_FETCH_ERROR:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'Error',
        APIData: action.data,
      };
    case LOGIN_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case LOGIN_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        status: 'success',
        APIData: state.APIData,
      };
    case LOGIN_API_FETCH_ERROR:
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
