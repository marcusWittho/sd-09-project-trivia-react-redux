export const SUBMIT_USER = 'SUBMIT_USER';
export const TIMES_UP = 'STIMES_UP';
export const STOP_TIME = 'STOP_TIME';

export const submitUser = (name, email, token) => ({
  type: SUBMIT_USER,
  name,
  email,
  token,
});

export const timesUp = (seconds) => ({
  type: TIMES_UP,
  seconds,
});

export const stopTime = () => ({
  type: STOP_TIME,
});
