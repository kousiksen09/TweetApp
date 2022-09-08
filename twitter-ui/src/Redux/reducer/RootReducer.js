import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { RegisterAPIReducer } from './APIReducer';
import {TweetPostReducer} from './TweetPostReducer';

const rootReducer = combineReducers({
  userReducer,
  RegisterAPIReducer,
  TweetPostReducer,
});

export default rootReducer;
