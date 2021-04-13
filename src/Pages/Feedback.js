import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {

  feedbackMessege() {
    const toCompare = 3;
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    if (assertions < toCompare) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    if (assertions >= toCompare) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
  }

  render() {
    return (
      <div>
        <p>Feedback</p>
        <Header />
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
        {this.feedbackMessege()}
      </div>
    );
  }
}

export default Feedback;
