import md5 from 'crypto-js/md5';

const objeto = { gravatarEmail: 'teste@test.com' };
localStorage.setItem('player', JSON.stringify(objeto));
const player = JSON.parse(localStorage.getItem('player'));
const email = player.gravatarEmail;
const hashEmail = md5(email).toString();
console.log(email);
console.log(hashEmail);

export default () => (
  fetch(`https://www.gravatar.com/avatar/${hashEmail}`)
    .then((response) => (
      response.json()
        .then((data) => (
          data
        ))
        .catch((error) => (
          error
        ))
    ))
);
