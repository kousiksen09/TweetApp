import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  axios_instance as axiosInstance,
  BaseURL,
} from '../../Utility/HelperFunctions/AxiosInstance';
import {
    likeFetchSuccess,
    likeFetchError,
} from '../Action/LikeAction';

function like(payload) {
    console.log(payload);
    let url = `${BaseURL}/tweets/like/${payload.like.Id}`;
    return axiosInstance.put(url);
}
function* handleLikeAPI(payload) {
    try {
      const response = yield call(like, payload);
      yield delay(500);
      if (response.status === 200) {
        yield put(likeFetchSuccess(response.data));
      } else {
        yield put(likeFetchError(response.data));
      }
    } catch (error) {
      yield put(likeFetchError(error.message));
    }
  }
    export function* watchLike() {
        yield takeLatest('LIKE_API_FETCH_INITIATED', handleLikeAPI);
  }