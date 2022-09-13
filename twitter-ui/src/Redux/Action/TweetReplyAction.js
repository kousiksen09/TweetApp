import {
  TWEETREPLY_API_INITIATED,
  TWEETREPLY_API_SUCCESS,
  TWEETREPLY_API_ERROR,
} from '../Type/ApiFetchType';

export const tweetreplyInitiated = (tweetreply) => ({
  type: TWEETREPLY_API_INITIATED,
  tweetreply,
});
export const tweetreplySuccess = (data) => ({
  type: TWEETREPLY_API_SUCCESS,
  data,
});
export const tweetreplyError = (data) => ({
  type: TWEETREPLY_API_ERROR,
  data,
});
