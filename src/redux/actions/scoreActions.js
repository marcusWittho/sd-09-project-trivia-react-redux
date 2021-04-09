import { UPDATE_SCORE, RESET_SCORE } from './actionTypes';

export const updateScore = ({ score }) => ({
  type: UPDATE_SCORE,
  payload: { score },
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
