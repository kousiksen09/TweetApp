import { all, fork } from 'redux-saga/effects';
import * as registerSaga from './registerSaga';
import * as logInSaga from './logInSaga';
import * as profileSaga from './ProfileFetchSaga';
import * as findUserNameSaga from './FindUserNameSaga';
import * as getAllUserSaga from './GetAllUserSaga';
import * as tweetPostSaga from './tweetPostSaga';
import * as getAllTweetSaga from './GetAllTweetSaga';
import * as likeSaga from './LikeSaga';
import * as getMyTweets from './GetMyTweetsSaga';
import * as getReplySaga from './GetReplySaga';
import * as tweetreplysaga from './TweetReplySaga';

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(registerSaga),
      ...Object.values(logInSaga),
      ...Object.values(profileSaga),
      ...Object.values(findUserNameSaga),
      ...Object.values(getAllUserSaga),
      ...Object.values(tweetPostSaga),
      ...Object.values(getAllTweetSaga),
      ...Object.values(likeSaga),
      ...Object.values(getMyTweets),
      ...Object.values(getReplySaga),
      ...Object.values(tweetreplysaga),
    ].map(fork)
  );
}
