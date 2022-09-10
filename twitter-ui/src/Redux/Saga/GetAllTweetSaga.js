import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  getAllTweetsapiFetchSuccess,
  getAllTweetsapiFetchError
} from '../Action/GetAllTweetsAction';

function allTweetFetch(payload) {
  let url = `${BaseURL}/tweets/all`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.apiPayload.token}` },
  });
}
function* handleAllTweetAPI(payload) {
  try {
    const response = yield call(allTweetFetch, payload);
    if (response.status === 200) {
      yield put(getAllTweetsapiFetchSuccess(response.data));
    } else {
      yield put(getAllTweetsapiFetchError(response.data));
    }
  } catch (error) {
    yield put(getAllTweetsapiFetchError(error.response.data));
  }
}

export function* watchTweetAPI() {
  yield takeLatest('GETALLTWEET_API_FETCH_INITIATED', handleAllTweetAPI);
}
