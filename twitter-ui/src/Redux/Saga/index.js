import { all, fork } from 'redux-saga/effects';
import * as registerSaga from './registerSaga';
import * as logInSaga from './logInSaga';
import * as tweetPostSaga from './tweetPostSaga';

export default function* rootSaga() {
  yield all(
    [...Object.values(registerSaga), ...Object.values(logInSaga),
    ...Object.values(tweetPostSaga)
    ].map(fork)
  );
}
