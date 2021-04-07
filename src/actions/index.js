export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const actions = (name, email) => ({
  type: SAVE_USER_DATA,
  name,
  email,
});
