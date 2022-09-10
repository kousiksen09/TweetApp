import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  getMyTweetsapiFetchError,
  getMyTweetsapiFetchSuccess,
} from '../Action/GetMyTweetAction';

function myTweetFetch(payload) {
  let url = `${BaseURL}/tweets/getMyTweets/${payload.apiPayload.id}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.apiPayload.token}` },
  });
}
function* handleMyTweetAPI(payload) {
  try {
    const response = yield call(myTweetFetch, payload);
    if (response.status === 200) {
      yield put(getMyTweetsapiFetchSuccess(response.data));
    } else {
      yield put(getMyTweetsapiFetchError(response.data));
    }
  } catch (error) {
    yield put(getMyTweetsapiFetchError(error.response.data));
  }
}

export function* watchTweetAPI() {
  yield takeLatest('GETMYTWEET_API_FETCH_INITIATED', handleMyTweetAPI);
}
