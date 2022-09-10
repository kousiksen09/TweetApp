import {TWEETREPLY_API_FETCH_INITIATED, TWEETREPLY_API_FETCH_SUCCESS, TWWEREPLY_API_FETCH_ERROR} from '../Type/ApiFetchType';

export const tweetreplyapiFetchInitiated = (tweetreply) => ({
    type: TWEETREPLY_API_FETCH_INITIATED,
    tweetreply,
  });
  export const tweetreplyapiFetchSuccess = (data) => ({
    type: TWEETREPLY_API_FETCH_SUCCESS,
    data,
  });
  export const tweetreplyapiFetchError = (data) => ({
    type: TWWEREPLY_API_FETCH_ERROR,
    data,
  });
  