import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
  tweetpostapiFetchSuccess,
  tweetpostapiFetchError,
} from '../Action/TweetPostAPIAction';

function tweetPost(payload) {
  console.log(payload);
  const formData = new FormData()
    formData.append('caption', payload.tweetdata.Caption)
    formData.append('postimage', payload.tweetdata.Image)

  let url = `${BaseURL}/tweets/${payload.tweetdata.Id}/add`;
  return axiosInstance.post(url, formData);
}
function* handlePostAPI(payload) {
  try {
    //yield put(registerapiFetchInitiated(payload.data));

    const response = yield call(tweetPost, payload);
    yield delay(500);
    if (response.status === 201 || response.status === 200) {
      yield put(tweetpostapiFetchSuccess(response.data));
    } else {
      yield put(tweetpostapiFetchError(response.data));
    }
  } catch (error) {
    yield put(tweetpostapiFetchError(error.message));
  }
}

export function* watchRegisterAPI() {
  yield takeLatest('POST_API_FETCH_INITIATED', handlePostAPI);
}
