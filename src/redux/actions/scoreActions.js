import { UPDATE_SCORE } from './actionTypes';

export const updateScore = ({ score }) => ({
  type: UPDATE_SCORE,
  payload: { score },
});

export default updateScore;
