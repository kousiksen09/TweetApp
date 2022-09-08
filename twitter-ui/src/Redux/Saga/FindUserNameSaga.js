import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  findUserNameapiFetchSuccess,
  findUserNameapiFetchError,
} from '../Action/FindUserNameAction';

function userNameFetch(payload) {
  let url = `${BaseURL}/tweets/getUsername/${payload.apiPayload.name}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.apiPayload.token}` },
  });
}
function* handleUserNameAPI(payload) {
  try {
    const response = yield call(userNameFetch, payload);
    if (response.status === 200) {
      yield put(findUserNameapiFetchSuccess(response.data));
    } else {
      yield put(findUserNameapiFetchError(response.data));
    }
  } catch (error) {
    yield put(findUserNameapiFetchError(error.response.data));
  }
}

export function* watchuserNameAPI() {
  yield takeLatest('FINDUSERNAME_API_FETCH_INITIATED', handleUserNameAPI);
}
