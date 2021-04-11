import { ADD_USER_INFO } from './types';

const addUserInfo = (info) => ({
  type: ADD_USER_INFO,
  payload: info,
});

export default addUserInfo;
