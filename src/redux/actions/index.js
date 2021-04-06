import USER_REGISTER from './actionstype';

const userRegister = (user, email) => ({
  type: USER_REGISTER,
  user,
  email,
});

export default userRegister;
