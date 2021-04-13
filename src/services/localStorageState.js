const localStorageState = {
  addAssertionPoint(answer) {
    if (answer === 'correct') {
      const previousState = JSON.parse(localStorage.getItem('state'));
      previousState.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(previousState));
    }
  },
};

export default localStorageState;
