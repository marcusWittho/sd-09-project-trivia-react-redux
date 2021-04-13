import {
  CLICK_PLAY,
  INCREMENT_SCORE,
  DECREMENT_TIMER,
  CHANGE_STATUS,
} from './typeActions';

export const clickPlay = (credentials) => ({
  type: CLICK_PLAY,
  credentials,
});

export const incrementScore = (localScore) => ({
  type: INCREMENT_SCORE,
  localScore,
});

export const decrementTimer = (time) => ({
  type: DECREMENT_TIMER,
  time,
});

export const changeStatus = (status) => ({
  type: CHANGE_STATUS,
  status,
});
