export function createRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (!ranking) localStorage.setItem('ranking', JSON.stringify([]));
}

export function getCurrentPlayerInfos() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const currentPlayer = ranking[ranking.length - 1];
  const { name, gravatarEmail, score } = currentPlayer;
  return { name, gravatarEmail, score };
}

export function addPlayerInRanking(gravatarEmail, player) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking.push(player);
  ranking.sort((playerOne, playerTWO) => playerTWO.score - playerOne.score);
  localStorage.setItem('ranking', JSON.stringify(ranking));
}
