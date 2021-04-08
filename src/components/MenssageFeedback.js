import React from 'react';
import { Link } from 'react-router-dom';

class MessageFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: JSON.parse(localStorage.getItem('state')).player.assertions,
      score: JSON.parse(localStorage.getItem('state')).player.score,
    };
  }

  render() {
    const valuePattern = 3;
    const { assertions, score } = this.state;
    return (
      <div>
        <p data-testid="feedback-text">
          { (assertions >= valuePattern) ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default MessageFeedback;
