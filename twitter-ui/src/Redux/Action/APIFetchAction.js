import {
  REGISTER_API_FETCH_ERROR,
  REGISTER_API_FETCH_INITIATED,
  REGISTER_API_FETCH_SUCCESS,
  LOGIN_API_FETCH_INITIATED,
  LOGIN_API_FETCH_SUCCESS,
  LOGIN_API_FETCH_ERROR,
} from '../Type/ApiFetchType';

export const registerapiFetchInitiated = (userData) => ({
  type: REGISTER_API_FETCH_INITIATED,
  userData,
});
export const registerapiFetchSuccess = (data) => ({
  type: REGISTER_API_FETCH_SUCCESS,
  data,
});
export const registerapiFetchError = (data) => ({
  type: REGISTER_API_FETCH_ERROR,
  data,
});

export const logInapiFetchInitiated = (userData) => ({
  type: LOGIN_API_FETCH_INITIATED,
  userData,
});
export const logInapiFetchSuccess = (data) => ({
  type: LOGIN_API_FETCH_SUCCESS,
  data,
});
export const logInapiFetchError = (data) => ({
  type: LOGIN_API_FETCH_ERROR,
  data,
});
