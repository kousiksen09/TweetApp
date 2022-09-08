import {POST_API_FETCH_INITIATED, POST_API_FETCH_SUCCESS, POST_API_FETCH_ERROR} from '../Type/ApiFetchType';

export const tweetpostapiFetchInitiated = (tweetdata) => ({
    type: POST_API_FETCH_INITIATED,
    tweetdata,
  });
  export const tweetpostapiFetchSuccess = (data) => ({
    type: POST_API_FETCH_SUCCESS,
    data,
  });
  export const tweetpostapiFetchError = (data) => ({
    type: POST_API_FETCH_ERROR,
    data,
  });
  