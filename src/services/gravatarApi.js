import md5 from 'crypto-js/md5';

export default () => {
  // Pegar  
  const player = JSON.parse(localStorage.getItem('player'));
  const hashEmail = md5(player.gravatarEmail).toString();
  
  const gravatar = `https://www.gravatar.com/avatar/${hashEmail}`;
  
  // Gerar
  const ranking = { 
    name: player.name, 
    score: player.score,
    picture: gravatar
  };

  localStorage.setItem('ranking', JSON.stringify(ranking));
};
