export const SUBMIT_USER = 'SUBMIT_USER';

export const submitUser = (name, email, token) => ({
  type: SUBMIT_USER,
  name,
  email,
  token,
});
