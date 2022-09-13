import {
  GETALLUSER_API_FETCH_ERROR,
  GETALLUSER_API_FETCH_INITIATED,
  GETALLUSER_API_FETCH_SUCCESS,
} from '../Type/ApiFetchType';
export const getAllUserapiFetchInitiated = (apiPayload) => ({
  type: GETALLUSER_API_FETCH_INITIATED,
  apiPayload,
});
export const getAllUserapiFetchSuccess = (data) => ({
  type: GETALLUSER_API_FETCH_SUCCESS,
  data,
});
export const getAllUserapiFetchError = (data) => ({
  type: GETALLUSER_API_FETCH_ERROR,
  data,
});
