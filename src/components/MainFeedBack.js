import React from 'react';

class MainFeedBack extends React.Component {
  getAssertions() {
    const assertions = localStorage.getItem('state');
    JSON.parse(assertions);
    console.log(JSON.parse(assertions));
  }

  render() {
    const assertions = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <h1>
        { this.getAssertions() }
        {assertions.player.assertions < minAssertions
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
      </h1>
    );
  }
}

export default MainFeedBack;
