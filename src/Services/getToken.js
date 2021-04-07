const getToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const obj = await response.json();
    localStorage.setItem('token', obj.token);
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export default getToken;
