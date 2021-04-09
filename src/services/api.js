import md5 from 'crypto-js/md5';

export const gravatarURL = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`;

export const getToken = async () => {
  const myToken = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token);
  localStorage.setItem('token', myToken);
  return myToken;
};

export const getQuestions = async (token) => {
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json());
  questions.results = questions.results.map((question) => (
    Object.fromEntries(Object.entries(question).map(([key, value]) => {
      if (key === 'correct_answer') return (['correctAnswer', value]);
      if (key === 'incorrect_answers') return (['incorrectAnswers', value]);
      return ([key, value]);
    }))));
  return questions.results;
};
