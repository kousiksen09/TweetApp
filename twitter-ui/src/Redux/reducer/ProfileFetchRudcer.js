import {
  PROFILE_API_FETCH_INITIATED,
  PROFILE_API_FETCH_SUCCESS,
  PROFILE_API_FETCH_ERROR,
} from '../Type/ApiFetchType';

const initialState = {
  status: '',
  APIData: [],
};

export const ProfileFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_API_FETCH_INITIATED:
      return {
        ...state,
        status: 'loading',
        APIData: [],
      };
    case PROFILE_API_FETCH_SUCCESS:
      state.APIData.push(action.data);
      return {
        ...state,
        status: 'success',
        APIData: state.APIData,
      };
    case PROFILE_API_FETCH_ERROR:
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
