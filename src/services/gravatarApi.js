import md5 from 'crypto-js/md5';

export default () => {
  const player = JSON.parse(localStorage.getItem('player'));
  const hashGravatar = md5(player.gravatarEmail).toString();

  const gravatar = `https://www.gravatar.com/avatar/${hashGravatar}`;

  const ranking = {
    name: player.name,
    score: player.score,
    picture: gravatar,
  };
  localStorage.setItem('ranking', JSON.stringify(ranking));
};
