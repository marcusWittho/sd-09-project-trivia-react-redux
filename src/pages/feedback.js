import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackText() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const magicNumber = 3;
    if (assertions < magicNumber) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <p>Teste de Feedback</p>
        <Header />
        { this.feedbackText() }
        <p>
          Total de acertos
          {' : '}
          <span
            data-testid="feedback-total-question"
          >
            { assertions }
          </span>
        </p>
        <p>
          Total de pontos
          {' : '}
          <span
            data-testid="feedback-total-score"
          >
            { score }
          </span>
        </p>
        {/* botao de play again */}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        {/* Botao de Ir ao ranking */}
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
