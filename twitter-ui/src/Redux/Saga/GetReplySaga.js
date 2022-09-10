import { call, put, takeLatest } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  getReplyapiFetchSuccess,
  getReplyapiFetchError,
} from '../Action/GetReplyAction';

function replyTweetFetch(payload) {
  let url = `${BaseURL}/TweetReply/tweetreplies/${payload.apiPayload.tweetId}`;
  return axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${payload.apiPayload.token}` },
  });
}
function* handleReplyAPI(payload) {
  try {
    const response = yield call(replyTweetFetch, payload);
    if (response.status === 200) {
      yield put(getReplyapiFetchSuccess(response.data));
    } else {
      yield put(getReplyapiFetchError(response.data));
    }
  } catch (error) {
    yield put(getReplyapiFetchError(error.response.data));
  }
}

export function* watchTweetAPI() {
  yield takeLatest('GETREPLY_API_FETCH_INITIATED', handleReplyAPI);
}
