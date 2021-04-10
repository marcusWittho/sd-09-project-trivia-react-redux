import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const condicionNumber = 3;
    const feedbackText = player.assertions < condicionNumber
      ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">{feedbackText}</p>
        <div>
          Você acertou
          <span data-testid="feedback-total-question">{player.assertions}</span>
          questões!
        </div>
        <div>
          Um total de
          <span data-testid="feedback-total-score">{player.score}</span>
          pontos
        </div>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
      </section>
    );
  }
}

export default FeedBack;
