import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  profileapiFetchSuccess,
  profileapiFetchError,
} from '../Action/ProfileFetch';

function profileFetch(payload) {
  let url = `${BaseURL}/tweets/search/${payload.userName.id}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.userName.token}` },
  });
}
function* handleProfileAPI(payload) {
  try {
    const response = yield call(profileFetch, payload);
    if (response.status === 200) {
      yield put(profileapiFetchSuccess(response.data));
    } else if (response.status === 400 || response.status === 401) {
      yield put(profileapiFetchError(response.data));
    } else {
      yield put(profileapiFetchError(response.data));
    }
  } catch (error) {
    yield put(profileapiFetchError(error.message));
  }
}

export function* watchProfileAPI() {
  yield takeLatest('PROFILE_API_FETCH_INITIATED', handleProfileAPI);
}
