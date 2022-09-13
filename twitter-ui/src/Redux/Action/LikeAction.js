import {
    LIKE_API_FETCH_INITIATED,
    LIKE_API_FETCH_SUCCESS,
    LIKE_API_FETCH_ERROR,
  } from '../Type/ApiFetchType';

  export const likeFetchInitiated = (like) => ({
    type: LIKE_API_FETCH_INITIATED,
    like,
  });
  export const likeFetchSuccess = (data) => ({
    type: LIKE_API_FETCH_SUCCESS,
    data,
  });
  export const likeFetchError = (data) => ({
    type: LIKE_API_FETCH_ERROR,
    data,
  });