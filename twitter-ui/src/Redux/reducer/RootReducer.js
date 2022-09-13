import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { RegisterAPIReducer } from './APIReducer';
import { ProfileFetchReducer } from './ProfileFetchRudcer';
import { FindUserNameReducer } from './FindUserNameReducer';
import { GetAllUserReducer } from './GetAllUserReducer';
import { TweetPostReducer } from './TweetPostReducer';
import { GetAllTweetsReducer } from './GetAllTweetsReducer';
import { likeReducer } from './LikeReducer';
import { GetMyTweetsReducer } from './GetMyTweetsReducer';
import { GetReplyReducer } from './GetReplyReducer';
import { TweetReplyReducer } from './TweetReplyReducer';

const rootReducer = combineReducers({
  userReducer,
  RegisterAPIReducer,
  ProfileFetchReducer,
  FindUserNameReducer,
  GetAllUserReducer,
  TweetPostReducer,
  GetAllTweetsReducer,
  likeReducer,
  GetMyTweetsReducer,
  GetReplyReducer,
  TweetReplyReducer,
});

export default rootReducer;
