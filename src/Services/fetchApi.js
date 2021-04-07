export const requestToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const apiToken = await response.json();
    return apiToken;
  } catch (error) {
    return Error(error);
  }
};

export default requestToken;
