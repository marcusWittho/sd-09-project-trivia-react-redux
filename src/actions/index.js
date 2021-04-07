import { ADD_USER_INFO } from './types';

export default addUserInfo = (info) => ({
  type: ADD_USER_INFO,
  payload: info,
});
