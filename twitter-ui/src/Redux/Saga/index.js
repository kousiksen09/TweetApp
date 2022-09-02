import { all, fork } from 'redux-saga/effects';
import * as registerSaga from './registerSaga';
import * as logInSaga from './logInSaga';

export default function* rootSaga() {
  yield all(
    [...Object.values(registerSaga), ...Object.values(logInSaga)].map(fork)
  );
}
