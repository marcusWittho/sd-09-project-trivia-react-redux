import React, { Component } from 'react';
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
      </section>
    );
  }
}

export default FeedBack;
