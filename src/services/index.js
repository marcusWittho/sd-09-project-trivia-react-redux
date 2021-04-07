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
