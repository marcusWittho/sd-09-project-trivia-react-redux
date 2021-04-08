import md5 from 'crypto-js/md5';

export async function fetchGravatar(email) {
  email = email.toLowerCase();
  email = email.replace(/\s/g, '');
  const hash = md5(email).toString();
  try {
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(url);
    const token = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
}
