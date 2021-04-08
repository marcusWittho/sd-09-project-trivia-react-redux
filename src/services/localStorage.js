export function createPlayerInRanking(initialPlayerInfos) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (ranking) {
    ranking.push(initialPlayerInfos);
    localStorage.ranking = JSON.stringify(ranking);
  } else {
    localStorage.setItem('ranking', JSON.stringify([initialPlayerInfos]));
  }
}

export function getCurrentPlayerInfos() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const currentPlayer = ranking[ranking.length - 1];
  const { name, picture, score } = currentPlayer;
  return { name, picture, score };
}

export function updateScoreToLocalStorage(playerEmail, scoreToAdd) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking[ranking.length - 1].score = scoreToAdd;
  const newRanking = ranking;
  localStorage.setItem('ranking', JSON.stringify(newRanking));
}
