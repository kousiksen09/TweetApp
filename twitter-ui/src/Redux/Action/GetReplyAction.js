import {
  GETREPLY_API_FETCH_ERROR,
  GETREPLY_API_FETCH_INITIATED,
  GETREPLY_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';
export const getReplyapiFetchInitiated = (apiPayload) => ({
  type: GETREPLY_API_FETCH_INITIATED,
  apiPayload,
});
export const getReplyapiFetchSuccess = (data) => ({
  type: GETREPLY_API_FETCH_SUCCESS,
  data,
});
export const getReplyapiFetchError = (data) => ({
  type: GETREPLY_API_FETCH_ERROR,
  data,
});
