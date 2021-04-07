import md5 from 'crypto-js/md5';

export const gravatarURL = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`;

export const getToken = async () => {
  const myToken = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token);
  return myToken;
};
