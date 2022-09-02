import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { RegisterAPIReducer } from './APIReducer';

const rootReducer = combineReducers({
  userReducer,
  RegisterAPIReducer,
});

export default rootReducer;
