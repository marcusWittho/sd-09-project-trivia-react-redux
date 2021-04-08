const token = '0f2cafc6336855b5936f74017747e27771a1d9a88e88704f0da700e2322d7';
// export const getQuestions = async (token) => {
const getQuestions = async () => {
  const GET_QUESTIONS_ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;

  try {
    const response = await fetch(GET_QUESTIONS_ENDPOINT);
    if (response.ok) {
      const questions = await response.json();
      if (questions.response_code === 0) {
        console.log(questions);
        return questions;
      }
    }
    throw new Error('Falha na busca pelas questoes.');
  } catch (error) {
    console.log(error);
    return error;
  }
};

// console.log(getQuestions(token));

// coloquei isso só pro lint para de perturbar. ass: Raquel xD
export default getQuestions;
