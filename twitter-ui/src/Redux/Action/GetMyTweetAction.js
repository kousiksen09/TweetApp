import {
  GETMYTWEET_API_FETCH_ERROR,
  GETMYTWEET_API_FETCH_INITIATED,
  GETMYTWEET_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';
export const getMyTweetsapiFetchInitiated = (apiPayload) => ({
  type: GETMYTWEET_API_FETCH_INITIATED,
  apiPayload,
});
export const getMyTweetsapiFetchSuccess = (data) => ({
  type: GETMYTWEET_API_FETCH_SUCCESS,
  data,
});
export const getMyTweetsapiFetchError = (data) => ({
  type: GETMYTWEET_API_FETCH_ERROR,
  data,
});
