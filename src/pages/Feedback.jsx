import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  showAssertions(assertions) {
    return assertions >= Number('3')
      ? <h3 data-testid="feedback-text">Mandou bem!</h3>
      : <h3 data-testid="feedback-text">Podia ser melhor...</h3>;
  }

  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <>
        <header>
          <h2 data-testid="feedback-text">Feedback</h2>
          <Header />
        </header>
        <div>
          {this.showAssertions(assertions)}
          <p>
            Score:
            <span data-testid="feedback-total-score">{` ${score} `}</span>
            pontos!
          </p>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">
              {` ${assertions} `}
            </span>
            perguntas!
          </p>
          <Link to="/Rankings">
            <button type="button" data-testid="btn-ranking">Ver Ranking</button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Feedback;
