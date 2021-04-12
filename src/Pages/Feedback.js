import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackMessege() {
    const toCompare = 3;
    if (localStorage.getItem('score') < toCompare) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    if (localStorage.getItem('score') >= toCompare) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedbackMessege()}
          <p>Feedback</p>
          <Link to="/">
            <button data-testid="btn-play-again" type="button">
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Feedback;
