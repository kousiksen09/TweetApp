import { all, fork } from 'redux-saga/effects';
import * as registerSaga from './registerSaga';
import * as logInSaga from './logInSaga';
import * as profileSaga from './ProfileFetchSaga';
import * as findUserNameSaga from './FindUserNameSaga';
import * as getAllUserSaga from './GetAllUserSaga';

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(registerSaga),
      ...Object.values(logInSaga),
      ...Object.values(profileSaga),
      ...Object.values(findUserNameSaga),
      ...Object.values(getAllUserSaga),
    ].map(fork)
  );
}
