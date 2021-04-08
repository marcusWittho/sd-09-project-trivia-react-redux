const GET_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  try {
    const tokenHttp = await fetch(GET_TOKEN_ENDPOINT);
    console.log(tokenHttp);
    if (tokenHttp.ok) {
      const token = await tokenHttp.json();
      if (token.response_code === 0) {
        return token.token;
      }
    }
    throw new Error('Falha ao gerar token.');
  } catch (error) {
    return error;
  }
};

// coloquei isso só pro lint para de perturbar. ass: Raquel xD
export const xablau = 'xablau';
