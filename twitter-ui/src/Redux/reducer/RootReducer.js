import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import { RegisterAPIReducer } from './APIReducer';
import { ProfileFetchReducer } from './ProfileFetchRudcer';
import { FindUserNameReducer } from './FindUserNameReducer';
import { GetAllUserReducer } from './GetAllUserReducer';

const rootReducer = combineReducers({
  userReducer,
  RegisterAPIReducer,
  ProfileFetchReducer,
  FindUserNameReducer,
  GetAllUserReducer,
});

export default rootReducer;
