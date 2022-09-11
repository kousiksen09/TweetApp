import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import { tweetreplySuccess, tweetreplyError } from '../Action/TweetReplyAction';

function tweetReply(payload) {
  console.log(payload);
  const formData = new FormData();
  formData.append('replyTweetBody', payload.tweetreply.reply);
  formData.append('tweetId', payload.tweetreply.tweetId);

  let url = `${BaseURL}/TweetReply/${payload.tweetreply.Id}/add`;
  return axiosInstance.post(url, formData);
}
function* handleTweetReplyAPI(payload) {
  try {
    const response = yield call(tweetReply, payload);
    yield delay(500);
    if (response.status === 201 || response.status === 200) {
      yield put(tweetreplySuccess(response.data));
    } else {
      yield put(tweetreplyError(response.data));
    }
  } catch (error) {
    yield put(tweetreplyError(error.message));
  }
}

export function* watchRegisterAPI() {
  yield takeLatest('TWEETREPLY_API_INITIATED', handleTweetReplyAPI);
}
