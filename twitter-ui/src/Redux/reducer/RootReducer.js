import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import tweetPostReducer from './TweetPostReducer.Js';
import tweetViewReducer from './TweetViewReducer';

const rootReducer = combineReducers({
  userReducer,
  tweetPostReducer,
  tweetViewReducer,
});

export default rootReducer;
