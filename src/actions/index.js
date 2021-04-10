import { ADD_USER_INFO } from './types';

const localUser = (info) => {
  const newLocalState = {
    player: {
      name: info.name,
      assertions: 0,
      score: 0,
      gravatarEmail: info.email,
    },
  };
  localStorage.setItem('state', JSON.stringify(newLocalState));
  return info;
};

const addUserInfo = (info) => ({
  type: ADD_USER_INFO,
  payload: localUser(info),
});

export default addUserInfo;
