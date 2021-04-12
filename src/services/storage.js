export const userStorage = ({ name, email }) => {
  const userLocalStorage = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(userLocalStorage));
};

export const scoreStorage = (newScore) => {
  const { player } = JSON.parse(localStorage.getItem('state'));
  const newLocalStorageState = JSON.stringify({
    player: { ...player, score: newScore, assertions: player.assertions + 1 },
  });
  localStorage.setItem('state', newLocalStorageState);
};
