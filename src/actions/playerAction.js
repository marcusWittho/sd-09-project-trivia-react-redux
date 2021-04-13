import { LOGIN, SAVE_SCORE } from '.';

const loginAction = (name, gravatarEmail) => ({
  type: LOGIN,
  name,
  gravatarEmail,
});

const scoreAction = (score) => ({
  type: SAVE_SCORE,
  score,
});

export { loginAction, scoreAction };
