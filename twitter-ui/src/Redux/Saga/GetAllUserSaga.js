import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  getAllUserapiFetchSuccess,
  getAllUserapiFetchError,
} from '../Action/GetAllUserAction';

function allUserFetch(payload) {
  let url = `${BaseURL}/tweets/getAllUsers`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.apiPayload.token}` },
  });
}
function* handleAllUserAPI(payload) {
  try {
    const response = yield call(allUserFetch, payload);
    if (response.status === 200) {
      yield put(getAllUserapiFetchSuccess(response.data));
    } else {
      yield put(getAllUserapiFetchError(response.data));
    }
  } catch (error) {
    yield put(getAllUserapiFetchError(error.response.data));
  }
}

export function* watchuserNameAPI() {
  yield takeLatest('GETALLUSER_API_FETCH_INITIATED', handleAllUserAPI);
}
