const STATE_KEY = 'state';
const TOKEN_KEY = 'token';

const getPlayer = () => {
  const playerJSON = localStorage.getItem(STATE_KEY);
  const player = JSON.parse(playerJSON);
  return player;
};

const addPointsToScore = (timer, difficulty) => {
  const pointValue = 10;
  const punctuation = pointValue + (timer * difficulty);
  const player = getPlayer();
  player.score += punctuation;
  localStorage.setItem(JSON.stringify(player));
};

const savePlayer = () => {

};

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

export default {
  addPointsToScore,
  savePlayer,
  getToken,
};
