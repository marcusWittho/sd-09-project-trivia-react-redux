import { SAVE_LOGIN } from './actionTypes';

export const saveLogin = ({ emailInput, nameInput }) => ({
  type: SAVE_LOGIN,
  payload: { emailInput, nameInput },
});
