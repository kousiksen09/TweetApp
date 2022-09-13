import {
    LIKE_API_FETCH_INITIATED,
    LIKE_API_FETCH_SUCCESS,
    LIKE_API_FETCH_ERROR,
  } from '../Type/ApiFetchType';
  
  const initialState = {
    status: '',
    APIData: [],
  };
  
  export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIKE_API_FETCH_INITIATED:
        return {
          ...state,
          status: 'loading',
          APIData: [],
        };
      case LIKE_API_FETCH_SUCCESS:
        state.APIData.push(action.data);
        return {
          ...state,
          status: 'success',
          APIData: state.APIData,
        };
      case LIKE_API_FETCH_ERROR:
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
  