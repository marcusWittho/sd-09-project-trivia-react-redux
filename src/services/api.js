const tokenURL = 'https://opentdb.com/api_token.php?command=request';
const token = localStorage.getItem('token');
const questionsURL = `https://opentdb.com/api.php?amount=5&token=${token}`;

export const tokenAPI = async () => {
  try {
    const response = await fetch(tokenURL);
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};

export const questionsAPI = async () => {
  try {
    const response = await fetch(questionsURL);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};
