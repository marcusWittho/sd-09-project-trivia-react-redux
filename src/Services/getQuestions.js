const getQuestions = async (token, type = '', category = '', difficulty = '') => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`;
  try {
    const response = await fetch(URL);
    const obj = await response.json();
    console.log(obj);
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export default getQuestions;
