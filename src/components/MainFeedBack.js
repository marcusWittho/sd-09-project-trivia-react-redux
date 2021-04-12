import React from 'react';
import { Link } from 'react-router-dom';

class MainFeedBack extends React.Component {
  render() {
    const assertions = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <>
        <h2 data-testid="feedback-total-question">{ assertions.player.assertions }</h2>
        {assertions.player.assertions < minAssertions
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

export default MainFeedBack;
