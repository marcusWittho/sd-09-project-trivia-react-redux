import LOGIN from '.';

const loginAction = (name, email) => ({
  type: LOGIN,
  name,
  email,
});

export default loginAction;
