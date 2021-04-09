export const SET_DATA_GAME = 'SET_DATA_GAME';
export const SET_TOKEN = 'SET_TOKEN';

export const dataGame = (data) => ({
  type: SET_DATA_GAME,
  data,
});

export const handleToken = (data) => ({
  type: SET_TOKEN,
  data,
});
