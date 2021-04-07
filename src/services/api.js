const getToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    return response.json();
  } catch (error) {
    return error;
  }
};

export default getToken;
