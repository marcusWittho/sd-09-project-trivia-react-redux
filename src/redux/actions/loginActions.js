import { SAVE_LOGIN } from './actionTypes';

const saveLogin = ({ emailInput, nameInput }) => ({
  type: SAVE_LOGIN,
  payload: { emailInput, nameInput },
});

export default saveLogin;
