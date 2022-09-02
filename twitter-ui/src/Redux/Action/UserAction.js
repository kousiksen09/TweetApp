import { IS_AUTHENTICATED, TWITTER_USER } from '../Type/UserType';
export const isAuthenticated = (isAuthenticated) => ({
  type: IS_AUTHENTICATED,
  isAuthenticated,
});

export const userAction = (user) => ({
  type: TWITTER_USER,
  user,
});
