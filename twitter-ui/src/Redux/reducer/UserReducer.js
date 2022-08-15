import { IS_AUTHENTICATED, TWITTER_USER } from '../Type/UserType';
const initialState = {
  isAuthenticated: false,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.data.isAuthenticated,
      };
    case TWITTER_USER: {
      return {
        ...state,
        user: action.data.user,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
