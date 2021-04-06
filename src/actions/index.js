import { LOG_USER } from './actionTypes';

export const logUserAction = (userInfo) => ({
  type: LOG_USER,
  userInfo,
});
