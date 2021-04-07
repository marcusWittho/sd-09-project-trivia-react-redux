//  parte do Leo
import md5 from 'crypto-js/md5';

// parte do Leo
export async function fetchQuestResponse(nrQuestions, token) {
  // eu usava o await na chamada da função mais vi a ana usando do endpooint entao coloquei aqui
  const endpoint = await `https://opentdb.com/api.php?amount=${nrQuestions}&token=${token}`;
  return fetch(endpoint)
    .then((listQuestions) => listQuestions.json())
    .then((listQuestions) => listQuestions.results);
}

// verificar "response_code":3, no fetch do token

export async function fetchGravatar(userEmail) {
  const hashCode = md5(userEmail).toString();
  const endpoint = await `https://www.gravatar.com/avatar/${hashCode}`;
  return endpoint;
}

// parte da Ana
export default requestToken;
