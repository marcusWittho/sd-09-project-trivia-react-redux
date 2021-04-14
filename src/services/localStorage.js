import gravatar from './gravatar';
import store from '../store';
import { getRigthAnswersToStore } from '../actions';

const STATE_KEY = 'state';
const TOKEN_KEY = 'token';
const RANKING_KEY = 'ranking';

const getPlayer = () => {
  const playerJSON = localStorage.getItem(STATE_KEY);
  const { player } = JSON.parse(playerJSON);
  return player;
};

const getScore = () => {
  try {
    const player = getPlayer();
    return player.score;
  } catch (err) {
    return null;
  }
};

const addPointsToScore = (time, difficulty) => {
  const pointValue = 10;
  const punctuation = pointValue + (time * difficulty);
  const player = getPlayer();
  player.score += punctuation;
  player.assertions += 1;
  localStorage.setItem(STATE_KEY, JSON.stringify({ player }));
  store.dispatch(getRigthAnswersToStore(player));
};

const savePlayer = (name, email) => {
  const state = { player: {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  } };
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
};

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

const getRanking = () => {
  const rankingJson = localStorage.getItem(RANKING_KEY);
  const ranking = JSON.parse(rankingJson);
  if (!ranking) return [];
  return ranking;
};

const addToRanking = (name, score, email) => {
  const ranking = getRanking();
  const photoUrl = gravatar.generateGravatarUrl(email);
  const player = { name, score, picture: photoUrl };
  ranking.push(player);
  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
};

export default {
  addPointsToScore,
  savePlayer,
  getPlayer,
  getToken,
  getScore,
  getRanking,
  addToRanking,
};
