import {
  FINDUSERNAME_API_FETCH_INITIATED,
  FINDUSERNAME_API_FETCH_SUCCESS,
  FINDUSERNAME_API_FETCH_ERROR,
} from '../Type/ApiFetchType';
export const findUserNameapiFetchInitiated = (apiPayload) => ({
  type: FINDUSERNAME_API_FETCH_INITIATED,
  apiPayload,
});
export const findUserNameapiFetchSuccess = (data) => ({
  type: FINDUSERNAME_API_FETCH_SUCCESS,
  data,
});
export const findUserNameapiFetchError = (data) => ({
  type: FINDUSERNAME_API_FETCH_ERROR,
  data,
});
