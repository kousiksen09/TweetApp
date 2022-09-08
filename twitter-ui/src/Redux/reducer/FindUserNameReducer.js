import {
  FINDUSERNAME_API_FETCH_INITIATED,
  FINDUSERNAME_API_FETCH_SUCCESS,
  FINDUSERNAME_API_FETCH_ERROR,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const FindUserNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINDUSERNAME_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case FINDUSERNAME_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case FINDUSERNAME_API_FETCH_ERROR:
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
