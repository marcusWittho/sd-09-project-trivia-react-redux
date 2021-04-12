import { CLICK_PLAY, INCREMENT_SCORE } from './typeActions';

export const clickPlay = (credentials) => ({
  type: CLICK_PLAY,
  credentials,
});

export const incrementScore = (localScore) => ({
  type: INCREMENT_SCORE,
  localScore,
});
