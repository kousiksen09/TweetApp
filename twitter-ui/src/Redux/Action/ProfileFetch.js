import {
  PROFILE_API_FETCH_INITIATED,
  PROFILE_API_FETCH_SUCCESS,
  PROFILE_API_FETCH_ERROR,
} from '../Type/ApiFetchType';
export const profileapiFetchInitiated = (userName) => ({
  type: PROFILE_API_FETCH_INITIATED,
  userName,
});
export const profileapiFetchSuccess = (data) => ({
  type: PROFILE_API_FETCH_SUCCESS,
  data,
});
export const profileapiFetchError = (data) => ({
  type: PROFILE_API_FETCH_ERROR,
  data,
});
