export const SUBMIT_USER = 'SUBMIT_USER';
export const TIMES_UP = 'STIMES_UP';

export const submitUser = (name, email, token) => ({
  type: SUBMIT_USER,
  name,
  email,
  token,
});

export const timesUp = () => ({
  type: TIMES_UP,
});
