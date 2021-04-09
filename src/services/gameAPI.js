const GAME_BASE_API = 'https://opentdb.com';

const getAPI = async () => {
  const endPoint = await fetch(`${GAME_BASE_API}/api_token.php?command=request`);
  const response = await endPoint.json();
  const getApi = await fetch(`${GAME_BASE_API}/api.php?amount=5&token=${response.token}`);
  const result = await getApi.json();
  return result;
};

export default getAPI;
