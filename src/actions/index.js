export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const handleLogin = (name, email) => ({
  type: SAVE_USER_DATA,
  name,
  email,
});
