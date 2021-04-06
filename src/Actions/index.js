export const SET_USER = 'SET_USER';

export const setUser = (email, name) => ({
  type: SET_USER,
  email,
  name,
});
