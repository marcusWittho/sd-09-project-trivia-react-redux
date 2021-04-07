const getToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const obj = await response.json();
    return obj.token;
  } catch (error) {
    console.error(error);
  }
};

export default getToken;
