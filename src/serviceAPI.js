import md5 from 'crypto-js/md5';

export const getToken = async () => {
  const requestFetch = await fetch('https://opentdb.com/api_token.php?command=request');
  const requestJSON = await requestFetch.json();
  return requestJSON;
};

export const getAsks = async (token) => {
  const requestFetch = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const requestJSON = await requestFetch.json();
  return requestJSON;
};

export const getGravatar = async (email) => {
  const emailHash = md5(email).toString();
  const requestFetch = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
  return requestFetch;
};
