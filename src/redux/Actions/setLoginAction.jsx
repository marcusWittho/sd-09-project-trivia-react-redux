import { SET_LOGIN } from './actionsType';

const setLoginAction = (userName, userEmail) => ({
  type: SET_LOGIN,
  userName,
  userEmail,
});

export default setLoginAction;
