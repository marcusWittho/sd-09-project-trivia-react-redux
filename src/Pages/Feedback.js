import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserData from '../Component/UserData';

class Feedback extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    let feedback = '';
    const assert = 3;
    if (player.assertions < assert) {
      feedback = 'Podia ser melhor...';
    }
    if (player.assertions >= assert) {
      feedback = 'Mandou bem!';
    }
    return (
      <div>
        <UserData />
        <p data-testid="feedback-text">
          { feedback }
        </p>
        <p data-testid="feedback-total-score">
          { player.score }
          points
        </p>
        <p data-testid="feedback-total-question">
          { player.assertions }
          acertos
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
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

export default Feedback;
