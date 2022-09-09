import {
  GETALLTWEET_API_FETCH_ERROR,
  GETALLTWEET_API_FETCH_INITIATED,
  GETALLTWEET_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';
export const getAllTweetsapiFetchInitiated = (apiPayload) => ({
  type: GETALLTWEET_API_FETCH_INITIATED,
  apiPayload,
});
export const getAllTweetsapiFetchSuccess = (data) => ({
  type: GETALLTWEET_API_FETCH_SUCCESS,
  data,
});
export const getAllTweetsapiFetchError = (data) => ({
  type: GETALLTWEET_API_FETCH_ERROR,
  data,
});
