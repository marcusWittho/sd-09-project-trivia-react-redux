export function getToken() {
  try {
    return (
      fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then((data) => data.token)
    );
  } catch (error) {
    console.log(error);
  }
}

export function getQuestions(token) {
  try {
    return (
      fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
        .then((response) => response.json())
    );
  } catch (error) {
    console.log(error);
  }
}

export function getGravatar(hash) {
  try {
    return (
      fetch(`https://www.gravatar.com/avatar/${hash}`)
        .then((response) => response.json())
    );
  } catch (error) {
    console.log(error);
  }
}
