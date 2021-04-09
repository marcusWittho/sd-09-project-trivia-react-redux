const getQuestions = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export default getQuestions;
