async function fetchTrivia() {
  const endpoint = await fetch('https://opentdb.com/api.php?amount=5');
  const questions = await endpoint.json();
  return questions;
}

export default fetchTrivia;
