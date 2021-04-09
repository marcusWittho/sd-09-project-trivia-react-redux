import { LOGIN } from '.';

const loginAction = (name, gravatarEmail) => ({
  type: LOGIN,
  name,
  gravatarEmail,
});

export default loginAction;
