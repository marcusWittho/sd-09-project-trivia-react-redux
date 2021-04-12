import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
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
