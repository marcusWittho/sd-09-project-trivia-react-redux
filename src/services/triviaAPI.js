const GET_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const tokenHttp = await fetch(GET_TOKEN_ENDPOINT);
  const token = await tokenHttp.json();
  if (token.response_code !== 0) {
    throw new Error('Falha ao gerar token.');
  }
  return token.token;
};

// coloquei isso só pro lint para de perturbar. ass: Raquel xD
export const xablau = 'xablau';
