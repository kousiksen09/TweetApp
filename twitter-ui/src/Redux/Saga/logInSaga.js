import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  logInapiFetchSuccess,
  logInapiFetchError,
} from '../Action/APIFetchAction';

function logInUser(payload) {
  console.log(payload);
  const userDetails = {
    userName: payload.userData.TWuserName,
    password: payload.userData.TWPassword,
    rememberMe: true,
  };
  let url = `${BaseURL}/tweets/login`;
  return axiosInstance.post(url, userDetails);
}
function* handleLogInAPI(payload) {
  try {
    //yield put(registerapiFetchInitiated(payload.data));

    const response = yield call(logInUser, payload);
    console.log('response type:', response);
    yield delay(500);
    if (response.status === 200) {
      yield put(logInapiFetchSuccess(response.data));
    } else {
      yield put(logInapiFetchError(response.data));
    }
  } catch (error) {
    yield put(logInapiFetchError(error.response.data));
  }
}

export function* watchLogInAPI() {
  yield takeLatest('LOGIN_API_FETCH_INITIATED', handleLogInAPI);
}
