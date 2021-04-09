export const SUBMIT_USER = 'SUBMIT_USER';
export const TIMES_UP = 'TIMES_UP';
export const STOP_TIME = 'STOP_TIME';
export const GET_SECONDS = 'GET_SECONDS';
export const ADD_PLAYER = 'ADD_PLAYER';


export const submitUser = (name, email, token) => ({
  type: SUBMIT_USER,
  name,
  email,
  token,
});

export const timesUp = () => ({
  type: TIMES_UP,
});

export const stopTime = () => ({
  type: STOP_TIME,
});

export const getSeconds = (seconds) => ({
  type: GET_SECONDS,
  seconds,
});

export const addPlayer = (objectPlayer) => ({
  type: ADD_PLAYER,
  objectPlayer,
});
