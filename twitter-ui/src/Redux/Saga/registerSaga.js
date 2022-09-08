import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  registerapiFetchSuccess,
  registerapiFetchError,
} from '../Action/APIFetchAction';

function registerUser(payload) {
  console.log(payload);
  const userDetails = {
    name: payload.userData.Twname,
    passwordHash: payload.userData.Twpassword,
    mobileNumber: payload.userData.TwMobileNumber,
    country: payload.userData.TwCountry,
    state: payload.userData.TwState,
    email: payload.userData.Twemail,
    gender: payload.userData.TwGender,
    dateOfBirth: payload.userData.TwDateOfBirth,
  };
  let url = `${BaseURL}/tweets/register`;
  return axiosInstance.post(url, userDetails);
}
function* handleRegisterAPI(payload) {
  try {
    //yield put(registerapiFetchInitiated(payload.data));

    const response = yield call(registerUser, payload);
    yield delay(500);
    if (response.status === 200) {
      yield put(registerapiFetchSuccess(response.data));
    } else {
      yield put(registerapiFetchError(response.data));
    }
  } catch (error) {
    yield put(registerapiFetchError(error.response.data));
  }
}

export function* watchRegisterAPI() {
  yield takeLatest('REGISTER_API_FETCH_INITIATED', handleRegisterAPI);
}
