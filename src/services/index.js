export { default as savePerformanceData } from './localStorageRanking';
export { default as localStorageState } from './localStorageState';

export async function fetchAndSaveToken() {
  const responseApi = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await responseApi.json();
  return token;
}

export async function fetchQuestions(token) {
  const responseApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questionList = await responseApi.json();
  return questionList;
}

export async function fetchQuestionsWithSettings(settingsList) {
  const responseApi = await fetch(`https://opentdb.com/api.php?amount=5${settingsList}`);
  const questionList = await responseApi.json();
  return questionList;
}
