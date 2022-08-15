import { IS_AUTHENTICATED, TWITTER_USER } from '../Type/UserType';
export const isAuthenticated = (data) => ({
  type: IS_AUTHENTICATED,
  data,
});

export const userAction = (data) => ({
  type: TWITTER_USER,
  data,
});
