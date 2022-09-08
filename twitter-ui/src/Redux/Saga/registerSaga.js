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
  const formData = new FormData()
    formData.append('name', payload.userData.Twname)
    formData.append('passwordHash', payload.userData.Twpassword)
    formData.append('mobileNumber', payload.userData.TwMobileNumber)
    formData.append('country', payload.userData.TwCountry)
    formData.append('state', payload.userData.TwState)
    formData.append('email', payload.userData.Twemail)
    formData.append('gender', payload.userData.TwGender)
    formData.append('dateOfBirth', payload.userData.TwDateOfBirth)
    formData.append('profilepicture', payload.userData.TwImageFile)


    let url = `${BaseURL}/tweets/register`;
    return axiosInstance.post(url, formData);
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
