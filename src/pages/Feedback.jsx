import React from 'react';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  render() {
    const userData = JSON.parse(localStorage.getItem('ranking'));
    const { score } = userData;
    const numberScore = 3;
    const totalScore = 10;
    return (
      <div>
        <Header />
        <p data-testid="correct-answer"> </p>
        <p data-testid="feedback-text">
          { score >= numberScore ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-score">
            { score }
          </span>
          {' '}
          questões!
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-question">
            { score * totalScore }
          </span>
          {' '}
          pontos.
        </p>
      </div>
    );
  }
}
